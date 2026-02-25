import type { Project } from '@/payload-types'

export type ImpactStatsProps = {
  impactStats: Project['impactStats']
}

export const ImpactStats = ({ impactStats }: ImpactStatsProps) => {
  if (!impactStats) {
    return null
  }

  const hasStats =
    Boolean(impactStats.dollarsRaised) ||
    Boolean(impactStats.peopleServed) ||
    Boolean(impactStats.volunteersInvolved) ||
    Boolean(impactStats.customStat && impactStats.customStatValue)

  if (!hasStats) {
    return null
  }

  return (
    <div className="grid gap-2 rounded border border-border bg-background p-4 text-sm">
      {impactStats.dollarsRaised ? <p>Dollars Raised: ${impactStats.dollarsRaised.toLocaleString()}</p> : null}
      {impactStats.peopleServed ? <p>People Served: {impactStats.peopleServed.toLocaleString()}</p> : null}
      {impactStats.volunteersInvolved ? <p>Volunteers: {impactStats.volunteersInvolved.toLocaleString()}</p> : null}
      {impactStats.customStat && impactStats.customStatValue ? (
        <p>
          {impactStats.customStat}: {impactStats.customStatValue}
        </p>
      ) : null}
    </div>
  )
}
