import { cn } from '@/lib/cn';

// ─────────────────────────────────────────────────────────────────────────────
// SparkChart
//
// Pure-SVG smooth line chart. No charting library, no client JS — server
// renders the final path and the SVG ships as part of the static HTML.
//
// PR 3.4 — built for the Gelişim page form-score progression, but generic
// enough to reuse: pass a data array of { x, y } points and a y-range.
//
// Curve uses Catmull-Rom → cubic bezier conversion so the line through
// adjacent points reads as smooth without becoming a spline blob.
// ─────────────────────────────────────────────────────────────────────────────

export interface SparkPoint {
  x: number;
  y: number;
  label?: string; // optional tooltip-style annotation
}

interface SparkChartProps {
  data: SparkPoint[];
  yMin: number;
  yMax: number;
  xMin?: number;
  xMax?: number;
  /** Display label for the Y-axis (e.g. "Form skoru") */
  yLabel?: string;
  /** Display label for the X-axis (e.g. "Gün") */
  xLabel?: string;
  /** Tick values for the Y axis gridlines */
  yTicks?: number[];
  /** Tick values for the X axis gridlines */
  xTicks?: number[];
  tone?: 'violet' | 'lime' | 'scan' | 'ember';
  className?: string;
  /** Highlight the first data point with a dot + value bubble */
  highlightStart?: boolean;
  /** Highlight the last data point with a dot + value bubble */
  highlightEnd?: boolean;
  /** ARIA description for screen readers */
  ariaLabel?: string;
}

const W = 720;
const H = 320;
const PAD_LEFT = 48;
const PAD_RIGHT = 56;
const PAD_TOP = 28;
const PAD_BOTTOM = 40;
const PLOT_W = W - PAD_LEFT - PAD_RIGHT;
const PLOT_H = H - PAD_TOP - PAD_BOTTOM;

const TONE_HEX: Record<NonNullable<SparkChartProps['tone']>, { line: string; dot: string; rgb: string }> = {
  violet: { line: '#A98AFF', dot: '#C9B8FF', rgb: '124, 92, 255' },
  lime: { line: '#C8FF00', dot: '#E3FF66', rgb: '200, 255, 0' },
  scan: { line: '#5FE3FF', dot: '#A8F1FF', rgb: '31, 207, 255' },
  ember: { line: '#FFA552', dot: '#FFC994', rgb: '255, 122, 26' },
};

export function SparkChart({
  data,
  yMin,
  yMax,
  xMin,
  xMax,
  yLabel,
  xLabel,
  yTicks,
  xTicks,
  tone = 'violet',
  className,
  highlightStart = true,
  highlightEnd = true,
  ariaLabel,
}: SparkChartProps) {
  if (data.length < 2) return null;

  const realXMin = xMin ?? data[0].x;
  const realXMax = xMax ?? data[data.length - 1].x;
  const xRange = realXMax - realXMin || 1;
  const yRange = yMax - yMin || 1;

  const palette = TONE_HEX[tone];
  const gradId = `spark-grad-${tone}`;

  // Map data point → SVG coordinate
  const proj = (p: SparkPoint) => ({
    x: PAD_LEFT + ((p.x - realXMin) / xRange) * PLOT_W,
    y: PAD_TOP + (1 - (p.y - yMin) / yRange) * PLOT_H,
  });

  const points = data.map(proj);

  // Catmull-Rom → cubic bezier (alpha = 0 uniform; soft natural curve)
  const linePath = points
    .map((p, i) => {
      if (i === 0) return `M ${p.x},${p.y}`;
      const p0 = points[i - 2] ?? points[i - 1];
      const p1 = points[i - 1];
      const p2 = p;
      const p3 = points[i + 1] ?? points[i];
      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;
      return `C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y}`;
    })
    .join(' ');

  // Area path = line + drop to baseline + close
  const areaBaseline = PAD_TOP + PLOT_H;
  const areaPath = `${linePath} L ${points[points.length - 1].x},${areaBaseline} L ${points[0].x},${areaBaseline} Z`;

  const startPoint = points[0];
  const endPoint = points[points.length - 1];
  const startData = data[0];
  const endData = data[data.length - 1];

  // Default ticks if not provided
  const finalYTicks = yTicks ?? defaultTicks(yMin, yMax, 4);
  const finalXTicks = xTicks ?? defaultTicks(realXMin, realXMax, 5);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={cn('w-full text-white/45', className)}
      role="img"
      aria-label={ariaLabel ?? `${yLabel ?? 'value'} over ${xLabel ?? 'time'}`}
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={palette.line} stopOpacity="0.45" />
          <stop offset="100%" stopColor={palette.line} stopOpacity="0" />
        </linearGradient>
        <filter id={`${gradId}-glow`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Horizontal gridlines */}
      {finalYTicks.map((tickValue) => {
        const y = PAD_TOP + (1 - (tickValue - yMin) / yRange) * PLOT_H;
        return (
          <g key={`y-${tickValue}`}>
            <line
              x1={PAD_LEFT}
              x2={W - PAD_RIGHT}
              y1={y}
              y2={y}
              stroke="rgba(255,255,255,0.06)"
              strokeDasharray="2 4"
            />
            <text
              x={PAD_LEFT - 10}
              y={y + 3}
              textAnchor="end"
              fontFamily="ui-monospace, monospace"
              fontSize="10"
              letterSpacing="0.1em"
              fill="rgba(255,255,255,0.4)"
            >
              {tickValue}
            </text>
          </g>
        );
      })}

      {/* X axis labels */}
      {finalXTicks.map((tickValue) => {
        const x = PAD_LEFT + ((tickValue - realXMin) / xRange) * PLOT_W;
        return (
          <text
            key={`x-${tickValue}`}
            x={x}
            y={H - PAD_BOTTOM + 18}
            textAnchor="middle"
            fontFamily="ui-monospace, monospace"
            fontSize="10"
            letterSpacing="0.1em"
            fill="rgba(255,255,255,0.4)"
          >
            {`G${tickValue}`}
          </text>
        );
      })}

      {/* Area fill under the curve */}
      <path d={areaPath} fill={`url(#${gradId})`} />

      {/* Main curve */}
      <path
        d={linePath}
        fill="none"
        stroke={palette.line}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter={`url(#${gradId}-glow)`}
      />

      {/* Endpoint dots + value bubbles */}
      {highlightStart && (
        <Endpoint
          x={startPoint.x}
          y={startPoint.y}
          value={startData.y}
          label={startData.label ?? `G${startData.x}`}
          palette={palette}
          side="right"
        />
      )}
      {highlightEnd && (
        <Endpoint
          x={endPoint.x}
          y={endPoint.y}
          value={endData.y}
          label={endData.label ?? `G${endData.x}`}
          palette={palette}
          side="left"
        />
      )}

      {/* Axis labels (corner positions) */}
      {yLabel && (
        <text
          x={PAD_LEFT - 36}
          y={PAD_TOP - 12}
          fontFamily="ui-monospace, monospace"
          fontSize="9"
          letterSpacing="0.25em"
          fill="rgba(255,255,255,0.5)"
        >
          {yLabel.toLocaleUpperCase('tr-TR')}
        </text>
      )}
      {xLabel && (
        <text
          x={W - PAD_RIGHT}
          y={H - 4}
          textAnchor="end"
          fontFamily="ui-monospace, monospace"
          fontSize="9"
          letterSpacing="0.25em"
          fill="rgba(255,255,255,0.5)"
        >
          {xLabel.toLocaleUpperCase('tr-TR')}
        </text>
      )}
    </svg>
  );
}

function Endpoint({
  x,
  y,
  value,
  label,
  palette,
  side,
}: {
  x: number;
  y: number;
  value: number;
  label: string;
  palette: { line: string; dot: string; rgb: string };
  side: 'left' | 'right';
}) {
  const bubbleX = side === 'right' ? x + 14 : x - 14;
  const bubbleAnchor = side === 'right' ? 'start' : 'end';

  return (
    <g>
      {/* Outer ring + inner dot */}
      <circle cx={x} cy={y} r="7" fill="none" stroke={palette.line} strokeWidth="1.4" opacity="0.4" />
      <circle cx={x} cy={y} r="3.5" fill={palette.line} />
      <circle cx={x} cy={y} r="3.5" fill={palette.dot} opacity="0.6" />

      {/* Value bubble */}
      <g transform={`translate(${bubbleX}, ${y})`}>
        <text
          x="0"
          y="-4"
          textAnchor={bubbleAnchor}
          fontFamily="ui-monospace, monospace"
          fontSize="10"
          letterSpacing="0.2em"
          fill={palette.line}
        >
          {value}
        </text>
        <text
          x="0"
          y="10"
          textAnchor={bubbleAnchor}
          fontFamily="ui-monospace, monospace"
          fontSize="9"
          letterSpacing="0.18em"
          fill="rgba(255,255,255,0.4)"
        >
          {label.toLocaleUpperCase('tr-TR')}
        </text>
      </g>
    </g>
  );
}

function defaultTicks(min: number, max: number, count: number): number[] {
  const step = (max - min) / count;
  return Array.from({ length: count + 1 }, (_, i) => Math.round(min + i * step));
}
