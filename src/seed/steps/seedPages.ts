import type { Payload } from 'payload'

import { h2, lexical, p } from '@/seed/core/richText'
import { upsertByField } from '@/seed/core/upsert'

export const seedPages = async (payload: Payload): Promise<void> => {
  await upsertByField(payload, {
    collection: 'pages',
    uniqueField: 'slug',
    uniqueValue: 'about',
    data: {
      title: 'About Us',
      slug: 'about',
      membersOnly: false,
      _status: 'published',
      content: lexical(
        h2('Who We Are'),
        p(
          'The Rotary Club of Downtown Lock Haven was chartered in 2003 and meets every Tuesday evening at 5:30 PM (social time begins at 5:15 PM) at the Poorman Gallery, 352 E. Water St., Lock Haven, PA. Work sessions are held at various locations including Covenant United Methodist Church and member homes.',
        ),
        p(
          'We are part of Rotary International District 7360 and are guided by Rotary\'s motto, "Service Above Self." Our members come from all walks of life and share a commitment to improving our community through hands-on service, fundraising, and fellowship.',
        ),
        h2('The Four-Way Test'),
        p(
          'Of the things we think, say, or do - Is it the TRUTH? Is it FAIR to all concerned? Will it build GOODWILL and BETTER FRIENDSHIPS? Will it be BENEFICIAL to all concerned?',
        ),
        h2('Meetings'),
        p(
          'Meetings alternate between regular club meetings (guest speakers, program updates, fellowship) and work sessions for active projects. In severe weather, Zoom participation is available. A Pledge of Allegiance, the Four-Way Test, and an invocation are part of each meeting.',
        ),
        p(
          'Happy Dollars - voluntary contributions made at meetings - go to a rotating local charity. Current charity (January-June 2026): the Clinton County Shoe Bank.',
        ),
        h2('New Members'),
        p(
          'New members are inducted at a club dinner and receive their Rotary pin from their sponsor at a subsequent meeting. Each new member gives a short talk about themselves at a later meeting. We welcome prospective members - come to a meeting as our guest!',
        ),
        h2('Community Connections'),
        p(
          'We partner with the Lock Haven Rotary Club (the "noon club") on select initiatives, including the Four-Way Test Speech Contest at Central Mountain High School. Our members work at The Express newspaper, Woodlands Bank, Diakon/AmeriCorps Seniors, and throughout Clinton County\'s business and nonprofit community.',
        ),
        h2('Press Coverage'),
        p(
          'The Express (lockhaven.com) covers many of our activities. In February 2026, our Valentine\'s Day goody tray deliveries to first responders were featured on the front page.',
        ),
      ),
    },
  })

  await upsertByField(payload, {
    collection: 'pages',
    uniqueField: 'slug',
    uniqueValue: 'officers',
    data: {
      title: 'Officers',
      slug: 'officers',
      membersOnly: false,
      _status: 'published',
      content: lexical(
        p(
          'Meet the officers and board members leading the Rotary Club of Downtown Lock Haven. Officers serve a one-year term running July 1 through June 30.',
        ),
        h2('2025-26 Officers'),
        p('President: Lisa Schropp'),
        p('Vice President: Janine Bruno'),
        p('Secretary: Wendy Stiver'),
        p('Treasurer: Heather Lively'),
        p('Assistant Treasurer/Secretary: Carmen Banfill'),
        h2('Board Members'),
        p('Area Governor (District 7360): Diahann Claghorn'),
        p('Immediate Past President: Marianne Lotfi'),
        h2('2026-27 Elected Officers (effective July 1, 2026)'),
        p('President: Lisa Schropp'),
        p('Vice President: Janine Bruno'),
        p('Secretary: Wendy Stiver'),
        p('Treasurer: Emma Persun'),
        p('Assistant Treasurer/Secretary: Carmen Banfill'),
      ),
    },
  })

  await upsertByField(payload, {
    collection: 'pages',
    uniqueField: 'slug',
    uniqueValue: 'scholarships',
    data: {
      title: 'Scholarships',
      slug: 'scholarships',
      membersOnly: false,
      _status: 'published',
      content: lexical(
        h2('Roberta Way Scholarship'),
        p(
          'The Rotary Club of Downtown Lock Haven awards the Roberta Way Scholarship annually to a deserving local student. Scholarship funds are held in a dedicated account separate from general club operations.',
        ),
        h2('Four-Way Test Speech Contest'),
        p(
          'The club also sponsors students from Central Mountain High School to compete in Rotary\'s Four-Way Test speech contest at regional and district levels, in partnership with the Lock Haven Rotary Club.',
        ),
        h2('How to Apply'),
        p(
          'Scholarship applications are announced through Central Mountain High School each spring. Contact the club at dlhrotary@gmail.com for more information.',
        ),
      ),
    },
  })

  await upsertByField(payload, {
    collection: 'pages',
    uniqueField: 'slug',
    uniqueValue: 'join',
    data: {
      title: 'Join Us',
      slug: 'join',
      membersOnly: false,
      _status: 'published',
      content: lexical(
        h2('Become a Rotarian'),
        p(
          'Rotary membership is open to adults who share a commitment to service. We welcome members from all professions, backgrounds, and walks of life. There is no age requirement.',
        ),
        h2('What to Expect'),
        p(
          'Come to a meeting as our guest - no commitment required. We meet every Tuesday at 5:30 PM (social at 5:15) at the Poorman Gallery, 352 E. Water St., Lock Haven.',
        ),
        p(
          'New members are proposed by an existing member (your sponsor), approved by the board, and inducted at a club dinner. You\'ll receive your Rotary pin at a subsequent meeting and give a short "about me" talk at a later date.',
        ),
        h2('Dues & Commitment'),
        p(
          'Annual dues cover Rotary International and district assessments. Members are encouraged to attend meetings regularly and participate in service projects - but the most important thing is showing up and connecting with the community.',
        ),
        h2('Get in Touch'),
        p(
          'Interested? Email us at dlhrotary@gmail.com or reach out to any member. We\'d love to have you.',
        ),
      ),
    },
  })

  await upsertByField(payload, {
    collection: 'pages',
    uniqueField: 'slug',
    uniqueValue: 'contact',
    data: {
      title: 'Contact',
      slug: 'contact',
      membersOnly: false,
      _status: 'published',
      content: lexical(
        h2('Get in Touch'),
        p('Email: dlhrotary@gmail.com'),
        p('Mailing Address: PO Box 634, Lock Haven, PA 17745'),
        h2('Club President'),
        p('Lisa Schropp'),
        p('Phone: 814-244-2929'),
        p('Email: lschropp3@icloud.com'),
        h2('Meeting Location'),
        p('Poorman Gallery, 352 E. Water St., Lock Haven, PA 17745'),
        p('Tuesdays at 5:30 PM (social time begins at 5:15 PM)'),
        h2('Social Media'),
        p('Facebook & Instagram: @dlhrotaryclub'),
        p('Press inquiries: contact Lisa Schropp at The Express - www.lockhaven.com'),
      ),
    },
  })

  await upsertByField(payload, {
    collection: 'pages',
    uniqueField: 'slug',
    uniqueValue: 'donate',
    data: {
      title: 'Support Us',
      slug: 'donate',
      membersOnly: false,
      _status: 'published',
      content: lexical(
        h2('Sponsor a Flag'),
        p(
          'Support our Flags of Honor project by sponsoring an American flag to be displayed in Triangle Park during Memorial Day. Each flag is placed in honor or memory of someone special to you. Contact dlhrotary@gmail.com to order.',
        ),
        h2('Attend Bingo'),
        p(
          'Join us for our annual Bingo Fundraiser on September 20, 2026 at KBR Bingo Hall. Enjoy basket raffles, 50-50 drawings, door prizes, and special games. Proceeds support club projects and scholarships.',
        ),
        h2('Corporate Sponsorships'),
        p(
          'Local businesses can sponsor a flag banner in Flags of Honor or support other club initiatives. Contact Diahann Claghorn or email dlhrotary@gmail.com for corporate sponsorship information.',
        ),
        h2('General Donations'),
        p(
          'To make a general donation to the club or the Roberta Way Scholarship fund, contact us at dlhrotary@gmail.com.',
        ),
      ),
    },
  })

  await upsertByField(payload, {
    collection: 'pages',
    uniqueField: 'slug',
    uniqueValue: 'documents',
    data: {
      title: 'Member Documents',
      slug: 'documents',
      membersOnly: true,
      _status: 'published',
      content: lexical(
        p(
          'Meeting minutes, club bylaws, financial reports, and other member resources are available here. Log in to access.',
        ),
      ),
    },
  })
}

