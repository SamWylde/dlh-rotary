import type { Payload } from 'payload'

import { h2, h3, lexical, p } from '@/seed/core/richText'
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
          'The Rotary Club of Downtown Lock Haven (Club ID 61484) is a small but active service club in Clinton County, Pennsylvania, affiliated with Rotary International District 7360, Area 3. Chartered in approximately 2003, the club celebrated its 22nd birthday in May 2025.',
        ),
        p(
          'We are known throughout the community for our signature projects including Flags of Honor, Angel Lights, Little Red Schoolhouse Libraries, and our annual scholarship program. Our motto embraces Rotary\'s "Service Above Self" and "People of Action" principles.',
        ),
        p(
          'Our members come from all walks of life: The Express newspaper, Woodlands Bank, Diakon/AmeriCorps Seniors, Rachel K Creations, and throughout Clinton County\'s business and nonprofit community. We share a commitment to improving our community through hands-on service, fundraising, and fellowship.',
        ),
        h2('The Four-Way Test'),
        p(
          'Of the things we think, say, or do: Is it the TRUTH? Is it FAIR to all concerned? Will it build GOODWILL and BETTER FRIENDSHIPS? Will it be BENEFICIAL to all concerned?',
        ),
        h2('Meetings'),
        p(
          'We meet every Tuesday at 5:30 PM (social time at 5:15) at the Poorman Gallery, 352 E. Water St., Lock Haven, PA. Meetings alternate between regular club meetings (guest speakers, program updates, fellowship) and work sessions for active projects. In severe weather, Zoom participation is available.',
        ),
        p(
          'Happy Dollars are voluntary contributions made at meetings that go to a rotating local charity every six months. Current charity (January through June 2026): the Lock Haven Area Shoe Bank. In July through December 2025, $380 went to Haven Cupboard.',
        ),
        h2('Community Impact'),
        p(
          'In the 2023-24 Rotary year alone, the club awarded $5,500 in scholarships and contributed approximately $5,000 to other causes including food programs, polio eradication, ShelterBox, and support for Ukrainian families. Organizations we have supported over the years include Sleep in Heavenly Peace, Boxes of Hope, The New Love Center, Haven Cupboard, the Lock Haven Area Shoe Bank, Roads to Peace, Salvation Army, Merit House, Bear Country Christmas Wish, and many more.',
        ),
        h2('Annual Awards'),
        h3('Rotarian of the Year'),
        p(
          '2024-25: Wendy Stiver. 2023-24: Diahann Claghorn. 2021-22: Marianne Lotfi.',
        ),
        h3('Downtowner of the Year'),
        p(
          '2024-25: Melissa Dally (Downtown Lock Haven Inc. / Clinton County Economic Partnership).',
        ),
        h3('Paul Harris Fellows'),
        p(
          'Bonnie Hannis: Paul Harris Fellow. Diahann Claghorn: Sapphire-level Paul Harris Fellow.',
        ),
        h2('Community Connections'),
        p(
          'We partner with the Lock Haven Rotary Club (the "noon club") on select initiatives, including the Four-Way Test Speech Contest at Central Mountain High School. The club also collaborates with numerous local nonprofits through the annual People of Action Open House, where we feature local organizations and donate $500 to each.',
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
        p(
          'The Rotary Club of Downtown Lock Haven awards three annual scholarships to graduating seniors at Central Mountain High School, totaling $5,500. Scholarship amounts have been increased significantly in recent years, funded by Flags of Honor proceeds and our Bingo fundraiser.',
        ),
        h2('Eleanor E.J. Kodish Memorial Scholarship ($2,000)'),
        p(
          'Criteria: Pursuing a career in education; attending Commonwealth University-Mansfield (or Lock Haven, or Penn State as substitutes).',
        ),
        p(
          'About Eleanor: Eleanor Kodish was a former Avis Elementary School principal who received the Outstanding Educator Award from Mansfield University. She was active in the club at age 95 and was named Rotarian of the Year and received the Service Above Self Award. This is the newest of the three scholarships.',
        ),
        h2('Dr. Betty Baird Schantz Memorial Scholarship ($2,000)'),
        p(
          'Criteria: Active Interact Club member.',
        ),
        p(
          'About Betty: Dr. Schantz owned the Partnership House Bed & Breakfast in Lock Haven and was a champion of local history. She retired from both Temple University (where she served as professor, director, and dean) and Lock Haven University (associate dean). She was active in the club into her 90s and was named Ross Library Friend of the Year. She originally chaired the Holiday Gift Bags for Veterans project.',
        ),
        h2('Roberta M. Way Memorial Scholarship ($1,500)'),
        p(
          'Criteria: College-bound student who demonstrates strong academics, commitment, and service; pursuing a career in education.',
        ),
        p(
          'About Roberta: Roberta "Bobbie" Way was a former member of the Mill Hall-Sunrise Rotary Club. She was active in the Millbrook Playhouse, AAUW, Clinton County Historical Society, and KCnet. She was a retired accounting teacher and the wife of the late John H. Way, a Lock Haven University geology professor. The scholarship is funded in part by family contributions and remaining funds from the former Mill Hall-Sunrise Rotary Club.',
        ),
        h2('Past Recipients'),
        p(
          '2024: Sofia Dressler ($2,000, Dr. Betty Baird Schantz Memorial). Interact president, received a dozen senior awards, earned 1st place in a national technical math competition.',
        ),
        h3('What Recipients Say'),
        p(
          '"I am super grateful to have received this scholarship. It helped me purchase some things for my dorm, as well as putting the rest of the money towards tuition and room and board, so my dog and I can live on campus and be more involved in the community." - Brooklynn Bechdel',
        ),
        h2('How to Apply'),
        p(
          'Scholarship applications are announced through Central Mountain High School each spring. Contact the club at dlhrotary@gmail.com for more information.',
        ),
        h2('Support These Scholarships'),
        p(
          'The public is encouraged to donate to these scholarship funds to honor the legacies of Eleanor Kodish, Dr. Betty Schantz, and Roberta Way. Contact the club at dlhrotary@gmail.com.',
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
          'Come to a meeting as our guest, no commitment required. We meet every Tuesday at 5:30 PM (social at 5:15) at the Poorman Gallery, 352 E. Water St., Lock Haven.',
        ),
        p(
          'New members are proposed by an existing member (your sponsor), approved by the board, and inducted at a club dinner. You\'ll receive your Rotary pin from your sponsor at a subsequent meeting and give a short "about me" talk at a later date.',
        ),
        h2('From Interact to Rotary'),
        p(
          'The club co-sponsors the Interact Club at Central Mountain High School, Rotary\'s organization for high school students. Several Interact alumni have gone on to become full Rotarians, including Emma Persun and Nate Akeley. If you\'re a current or former Interact member, we\'d especially love to hear from you.',
        ),
        h2('Recent Members'),
        p(
          'Thomas Darby joined in December 2025 after completing the Leadership Clinton County program. Emma Persun, a former Interact alumna who works at Rachel K Creations, joined in June 2025. Haley Jolin was welcomed in February 2026. New members are always welcome!',
        ),
        h2('Dues & Commitment'),
        p(
          'Annual dues cover Rotary International and district assessments. Members are encouraged to attend meetings regularly and participate in service projects, but the most important thing is showing up and connecting with the community.',
        ),
        h2('Get in Touch'),
        p(
          'Interested? Email us at dlhrotary@gmail.com, call President Lisa Schropp at 814-244-2929, or visit our Facebook page (Rotary Club of Downtown Lock Haven). You can also attend our October People of Action Open House to learn more. We\'d love to have you.',
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
        p('Press inquiries: contact Lisa Schropp at The Express (www.lockhaven.com)'),
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
          'Support our Flags of Honor project by sponsoring an American flag ($35) to be displayed in Triangle Park during Memorial Day. Each flag is placed in honor or memory of someone special to you. Contact dlhrotary@gmail.com or Wendy Stiver at 570-295-3443 to order.',
        ),
        h2('Angel Lights Luminaries'),
        p(
          'Sponsor a luminary ($5) for our September 11 Angel Lights display in Triangle Park. Luminaries honor first responders, veterans, teachers, friends, and loved ones. Available at The Bus Stops Here (25 E. Main St.) and during the Labor Day Regatta weekend.',
        ),
        h2('Attend Bingo'),
        p(
          'Join us for our Bingo Fundraiser in September 2026 at KBR Bingo Hall. Enjoy basket raffles, 50-50 drawings, door prizes, and special games. Tickets are $20. Proceeds support club projects and scholarships.',
        ),
        h2('Scholarship Fund Donations'),
        p(
          'Donate to our scholarship funds to honor the legacies of Eleanor Kodish, Dr. Betty Schantz, and Roberta Way. Three scholarships totaling $5,500 are awarded annually to Central Mountain High School seniors. Contact dlhrotary@gmail.com.',
        ),
        h2('Corporate Sponsorships'),
        p(
          'Local businesses can sponsor a flag banner in Flags of Honor, support Angel Lights, or contribute to other club initiatives. Contact dlhrotary@gmail.com for corporate sponsorship information.',
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
