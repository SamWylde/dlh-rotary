import { PayloadFormRenderer } from '@/components/forms/PayloadFormRenderer'
import type { SessionUser } from '@/lib/auth'
import { getProjectVolunteerForm } from '@/lib/content'
import type { Project } from '@/payload-types'

type VolunteerProject = Pick<Project, 'title' | 'volunteerSignupEnabled' | 'volunteerForm'>

export type VolunteerSignupProps = {
  project: VolunteerProject
  user?: SessionUser | null
}

export const VolunteerSignup = async ({ project, user }: VolunteerSignupProps) => {
  if (!project.volunteerSignupEnabled) {
    return null
  }

  const form = await getProjectVolunteerForm(project, user)

  if (!form) {
    return (
      <section className="grid gap-2 rounded-lg border border-dashed border-border bg-card p-4">
        <h2 className="text-2xl font-semibold">Volunteer Signup</h2>
        <p className="text-sm text-muted-foreground">
          Volunteer signup is enabled for this project, but no form is configured yet.
        </p>
      </section>
    )
  }

  return (
    <section className="grid gap-4">
      <h2 className="text-2xl font-semibold">Volunteer Signup</h2>
      <p className="text-sm text-muted-foreground">Complete this form to volunteer for {project.title}.</p>
      <PayloadFormRenderer form={form} />
    </section>
  )
}
