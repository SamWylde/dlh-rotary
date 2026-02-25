import type { Page } from '@/payload-types'

type StatsBarBlockData = Extract<NonNullable<Page['layout']>[number], { blockType: 'statsBlock' }>

type StatRow = NonNullable<StatsBarBlockData['stats']>[number]

const hasMeaningfulStatData = (stat: StatRow): boolean =>
  Boolean(
    (typeof stat.label === 'string' && stat.label.trim()) ||
      (typeof stat.value === 'string' && stat.value.trim()) ||
      (typeof stat.description === 'string' && stat.description.trim()),
  )

export const StatsBarBlock = ({ block }: { block: StatsBarBlockData }) => {
  const heading = typeof block.heading === 'string' ? block.heading.trim() : ''
  const stats = (block.stats || []).filter(hasMeaningfulStatData)

  if (!heading && stats.length === 0) {
    return null
  }

  return (
    <section className="grid gap-4 rounded-lg border border-border bg-card p-6">
      {heading ? <h2 className="text-2xl font-semibold">{heading}</h2> : null}
      {stats.length > 0 ? (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <article className="grid gap-1 rounded border border-border bg-background p-4" key={stat.id || index}>
              {stat.value ? <p className="text-2xl font-semibold">{stat.value}</p> : null}
              {stat.label ? <p className="text-sm font-medium text-muted-foreground">{stat.label}</p> : null}
              {stat.description ? <p className="text-xs text-muted-foreground">{stat.description}</p> : null}
            </article>
          ))}
        </div>
      ) : null}
    </section>
  )
}
