import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Use | Soltree",
  description:
    "Read the Terms and Conditions for using the Soltree website, including licensing, cookies, content liability, and disclaimer policies.",
};

export default function TermsPage() {
  return (
    <>
      <section className="bg-slate-950 py-14">
        <div className="container text-center">
          <p className="section-eyebrow text-green-300">Legal</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Terms of Use
          </h1>
          <p className="mt-4 text-sm text-slate-400">
            Last updated: April 2026
          </p>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <div className="prose prose-gray max-w-none text-sm leading-relaxed text-gray-600 [&_h2]:mb-3 [&_h2]:mt-10 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-gray-900 [&_p]:mb-4 [&_ul]:mb-4 [&_ul]:space-y-1.5 [&_ul]:pl-5 [&_ul>li]:list-disc [&_ul>li]:text-gray-600">

              <p>
                Welcome to Soltree! These terms and conditions outline the rules and regulations
                for using Soltree&apos;s website. By accessing this website, we assume you accept
                these terms and conditions. Do not continue to use Soltree if you do not agree
                to all of the terms and conditions stated on this page.
              </p>

              <h2>Cookies</h2>
              <p>
                The website uses cookies to help personalize your online experience. By accessing
                Soltree, you agree to use the required cookies.
              </p>
              <p>
                A cookie is a text file placed on your hard disk by a web page server. Cookies cannot
                be used to run programs or deliver viruses to your computer. Cookies are uniquely
                assigned to you and can only be read by a web server in the domain that issued the cookie.
              </p>
              <p>
                To operate our website, we may use cookies to collect, store, and track information for
                statistical or marketing purposes. You can accept or decline optional cookies. There are
                some required cookies that are necessary for the operation of our website. These cookies
                do not require your consent, as they always work. Please keep in mind that by accepting
                required cookies, you also accept third-party cookies, which might be used via third-party
                provided services if you use such services on our website.
              </p>

              <h2>License</h2>
              <p>
                Unless otherwise stated, Soltree and/or its licensors own the intellectual property
                rights for all material on Soltree. All intellectual property rights are reserved.
                You may access this from Soltree for your own personal use, subject to restrictions
                set in these terms and conditions.
              </p>
              <p>You must not:</p>
              <ul>
                <li>Copy or republish material from Soltree</li>
                <li>Sell, rent, or sub-license material from Soltree</li>
                <li>Reproduce, duplicate, or copy material from Soltree</li>
                <li>Redistribute content from Soltree</li>
              </ul>
              <p>This Agreement shall begin on the date hereof.</p>

              <h2>Comments</h2>
              <p>
                Parts of this website allow users to post and exchange opinions and information in
                certain areas of the website. Soltree does not filter, edit, publish, or review
                Comments before their presence on the website. Comments do not reflect the views and
                opinions of Soltree, its agents, and/or affiliates. Comments reflect the views and
                opinions of the person who posts their views and opinions. To the extent permitted by
                applicable laws, Soltree shall not be liable for the Comments or any liability,
                damages, or expenses caused and/or suffered as a result of any use of and/or posting
                of and/or appearance of the Comments on this website.
              </p>
              <p>
                Soltree reserves the right to monitor all Comments and remove any Comments that can
                be considered inappropriate, offensive, or causes breach of these Terms and Conditions.
              </p>
              <p>You warrant and represent that:</p>
              <ul>
                <li>
                  You are entitled to post the Comments on our website and have all necessary licenses
                  and consents to do so;
                </li>
                <li>
                  The Comments do not invade any intellectual property right, including without
                  limitation copyright, patent, or trademark of any third party;
                </li>
                <li>
                  The Comments do not contain any defamatory, libelous, offensive, indecent, or
                  otherwise unlawful material, which is an invasion of privacy;
                </li>
                <li>
                  The Comments will not be used to solicit or promote business or custom or present
                  commercial activities or unlawful activity.
                </li>
              </ul>
              <p>
                You hereby grant Soltree a non-exclusive license to use, reproduce, edit and authorize
                others to use, reproduce and edit any of your Comments in any and all forms, formats, or media.
              </p>

              <h2>Hyperlinking to Our Content</h2>
              <p>
                The following organizations may link to our website without prior written approval:
              </p>
              <ul>
                <li>Government agencies;</li>
                <li>Search engines;</li>
                <li>News organizations;</li>
                <li>
                  Online directory distributors may link to our website in the same manner as they
                  hyperlink to the websites of other listed businesses; and
                </li>
                <li>
                  System-wide accredited businesses except soliciting non-profit organizations, charity
                  shopping malls, and charity fundraising groups which may not hyperlink to our website.
                </li>
              </ul>
              <p>
                These organizations may link to our home page, to publications, or to other website
                information so long as the link: (a) is not in any way deceptive; (b) does not falsely
                imply sponsorship, endorsement, or approval of the linking party and its products and/or
                services; and (c) fits within the context of the linking party&apos;s site.
              </p>
              <p>
                We may consider and approve other link requests from the following types of organizations:
              </p>
              <ul>
                <li>Commonly-known consumer and/or business information sources;</li>
                <li>Dot.com community sites;</li>
                <li>Associations or other groups representing charities;</li>
                <li>Online directory distributors;</li>
                <li>Internet portals;</li>
                <li>Accounting, law, and consulting firms; and</li>
                <li>Educational institutions and trade associations.</li>
              </ul>
              <p>
                We will approve link requests from these organizations if we decide that: (a) the link
                would not make us look unfavorably to ourselves or to our accredited businesses; (b) the
                organization does not have any negative records with us; (c) the benefit to us from the
                visibility of the hyperlink compensates the absence of Soltree; and (d) the link is in
                the context of general resource information.
              </p>
              <p>
                If you are one of the organizations listed above and are interested in linking to our
                website, you must inform us by sending an e-mail to Soltree. Please include your name,
                your organization name, contact information as well as the URL of your site, a list of
                any URLs from which you intend to link to our website, and a list of the URLs on our site
                to which you would like to link. Wait 2–3 weeks for a response.
              </p>
              <p>Approved organizations may hyperlink to our website as follows:</p>
              <ul>
                <li>By use of our corporate name; or</li>
                <li>By use of the uniform resource locator being linked to; or</li>
                <li>
                  Using any other description of our website being linked to that makes sense within
                  the context and format of content on the linking party&apos;s site.
                </li>
              </ul>
              <p>
                No use of Soltree&apos;s logo or other artwork will be allowed for linking absent a
                trademark license agreement.
              </p>

              <h2>Content Liability</h2>
              <p>
                We shall not be held responsible for any content that appears on your website. You agree
                to protect and defend us against all claims that are raised on your website. No link(s)
                should appear on any website that may be interpreted as libelous, obscene, or criminal,
                or which infringes, otherwise violates, or advocates the infringement or other violation
                of, any third party rights.
              </p>

              <h2>Reservation of Rights</h2>
              <p>
                We reserve the right to request that you remove all links or any particular link to our
                website. You approve to immediately remove all links to our website upon request. We also
                reserve the right to amend these terms and conditions and its linking policy at any time.
                By continuously linking to our website, you agree to be bound to and follow these linking
                terms and conditions.
              </p>

              <h2>Removal of Links from Our Website</h2>
              <p>
                If you find any link on our website that is offensive for any reason, you are free to
                contact and inform us at any moment. We will consider requests to remove links, but we
                are not obligated to do so or to respond to you directly.
              </p>
              <p>
                We do not ensure that the information on this website is correct. We do not warrant its
                completeness or accuracy, nor do we promise to ensure that the website remains available
                or that the material on the website is kept up to date.
              </p>

              <h2>Disclaimer</h2>
              <p>
                To the maximum extent permitted by applicable law, we exclude all representations,
                warranties, and conditions relating to our website and the use of this website. Nothing
                in this disclaimer will:
              </p>
              <ul>
                <li>Limit or exclude our or your liability for death or personal injury;</li>
                <li>
                  Limit or exclude our or your liability for fraud or fraudulent misrepresentation;
                </li>
                <li>
                  Limit any of our or your liabilities in any way that is not permitted under
                  applicable law; or
                </li>
                <li>
                  Exclude any of our or your liabilities that may not be excluded under applicable law.
                </li>
              </ul>
              <p>
                The limitations and prohibitions of liability set in this section and elsewhere in this
                disclaimer: (a) are subject to the preceding paragraph; and (b) govern all liabilities
                arising under the disclaimer, including liabilities arising in contract, in tort, and
                for breach of statutory duty.
              </p>
              <p>
                As long as the website and the information and services on the website are provided free
                of charge, we will not be liable for any loss or damage of any nature.
              </p>

              <h2>Contact Us</h2>
              <p>
                If you have any questions about these Terms of Use, please contact us:
              </p>
              <p>
                Soltree Support Team
                <br />
                <a
                  href="mailto:jacky@cnsoltree.com"
                  className="font-medium text-green-700 hover:text-green-800 transition-colors"
                >
                  jacky@cnsoltree.com
                </a>
              </p>

            </div>

            <div className="mt-12 border-t border-gray-100 pt-8 text-center">
              <Link href="/" className="btn-outline text-sm">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
