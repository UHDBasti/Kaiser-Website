import { NodeBackground } from "@/components/ui/NodeBackground";
import { useLanguage } from "@/lib/i18n";
import { Link } from "wouter";

export default function Impressum() {
  const { language } = useLanguage();

  if (language === "en") {
    return <ImpressumEN />;
  }

  return <ImpressumDE />;
}

function ImpressumDE() {
  return (
    <div className="min-h-screen w-full pt-24 pb-20">
      <NodeBackground />
      <div className="max-w-3xl mx-auto px-4 relative z-10 prose prose-invert prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-a:text-primary">
        <h1 data-testid="text-impressum-title">Impressum</h1>
        <p className="text-sm text-muted-foreground">Angaben gemäß § 5 Digitale-Dienste-Gesetz (DDG)</p>

        <h2>Diensteanbieter</h2>
        <p>
          <strong>Kaiser-Service</strong><br />
          Sebastian Kaiser<br />
          23568 Lübeck<br />
          Deutschland
        </p>

        <h2>Kontakt (schnelle elektronische Kontaktaufnahme)</h2>
        <p>
          E-Mail: <a href="mailto:Service-Kaiser@proton.me" data-testid="link-email-impressum">Service-Kaiser@proton.me</a>
        </p>
        <p className="text-sm">
          Anfragen werden in der Regel innerhalb von 24 Stunden bearbeitet. 
          Alternativ können Sie auch unser <Link href="/contact">Kontaktformular</Link> nutzen.
        </p>

        <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
        <p>
          Sebastian Kaiser<br />
          23568 Lübeck<br />
          Deutschland
        </p>

        <h2>Berufsbezeichnung und berufsrechtliche Regelungen</h2>
        <p>
          Berufsbezeichnung: IT-Berater / AI Consultant<br />
          Zuständige Kammer: Keine (freier Beruf)<br />
          Verliehen in: Deutschland
        </p>

        <h2>EU-Streitschlichtung</h2>
        <p>
          Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: 
          <a 
            href="https://ec.europa.eu/consumers/odr/" 
            target="_blank" 
            rel="noopener noreferrer"
            data-testid="link-eu-odr"
          >
            https://ec.europa.eu/consumers/odr/
          </a>
        </p>
        <p>
          Unsere E-Mail-Adresse finden Sie oben im Impressum.
        </p>

        <h2>Verbraucherstreitbeilegung / Universalschlichtungsstelle</h2>
        <p>
          Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer 
          Verbraucherschlichtungsstelle teilzunehmen.
        </p>

        <h2>Haftung für Inhalte</h2>
        <p>
          Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen Seiten 
          nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir als Diensteanbieter 
          jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen 
          oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
        </p>
        <p>
          Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen 
          Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt 
          der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden 
          Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
        </p>

        <h2>Haftung für Links</h2>
        <p>
          Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss 
          haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte 
          der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. 
          Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. 
          Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.
        </p>
        <p>
          Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte 
          einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir 
          derartige Links umgehend entfernen.
        </p>

        <h2>Urheberrecht</h2>
        <p>
          Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem 
          deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung 
          außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen 
          Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht 
          kommerziellen Gebrauch gestattet.
        </p>
        <p>
          Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte 
          Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie 
          trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden 
          Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
        </p>

        <div className="mt-8 pt-6 border-t border-border">
          <p className="text-sm">
            Weitere rechtliche Informationen finden Sie in unserer{" "}
            <Link href="/datenschutz" data-testid="link-datenschutz-impressum">Datenschutzerklärung</Link> und 
            unseren <Link href="/agb" data-testid="link-agb-impressum">Allgemeinen Geschäftsbedingungen</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}

function ImpressumEN() {
  return (
    <div className="min-h-screen w-full pt-24 pb-20">
      <NodeBackground />
      <div className="max-w-3xl mx-auto px-4 relative z-10 prose prose-invert prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-a:text-primary">
        <h1 data-testid="text-impressum-title">Legal Notice (Impressum)</h1>
        <p className="text-sm text-muted-foreground">Information according to § 5 Digital Services Act (DDG)</p>

        <h2>Service Provider</h2>
        <p>
          <strong>Kaiser-Service</strong><br />
          Sebastian Kaiser<br />
          23568 Lübeck<br />
          Germany
        </p>

        <h2>Contact (Rapid Electronic Communication)</h2>
        <p>
          Email: <a href="mailto:Service-Kaiser@proton.me" data-testid="link-email-impressum">Service-Kaiser@proton.me</a>
        </p>
        <p className="text-sm">
          Inquiries are typically processed within 24 hours. 
          Alternatively, you can use our <Link href="/contact">contact form</Link>.
        </p>

        <h2>Responsible for Content according to § 18 para. 2 MStV</h2>
        <p>
          Sebastian Kaiser<br />
          23568 Lübeck<br />
          Germany
        </p>

        <h2>Professional Designation and Regulatory Information</h2>
        <p>
          Professional Designation: IT Consultant / AI Consultant<br />
          Responsible Chamber: None (freelance profession)<br />
          Granted in: Germany
        </p>

        <h2>EU Dispute Resolution</h2>
        <p>
          The European Commission provides a platform for online dispute resolution (ODR): 
          <a 
            href="https://ec.europa.eu/consumers/odr/" 
            target="_blank" 
            rel="noopener noreferrer"
            data-testid="link-eu-odr"
          >
            https://ec.europa.eu/consumers/odr/
          </a>
        </p>
        <p>
          You can find our email address above in this legal notice.
        </p>

        <h2>Consumer Dispute Resolution / Universal Arbitration Board</h2>
        <p>
          We are not willing or obliged to participate in dispute resolution proceedings 
          before a consumer arbitration board.
        </p>

        <h2>Liability for Content</h2>
        <p>
          As a service provider, we are responsible for our own content on these pages in 
          accordance with § 7 para. 1 DDG under general law. According to §§ 8 to 10 DDG, 
          however, as a service provider we are not obliged to monitor transmitted or 
          stored third-party information or to investigate circumstances that indicate 
          illegal activity.
        </p>
        <p>
          Obligations to remove or block the use of information under general law remain 
          unaffected. However, liability in this regard is only possible from the point 
          in time at which a concrete legal violation becomes known. Upon becoming aware 
          of such legal violations, we will remove these contents immediately.
        </p>

        <h2>Liability for Links</h2>
        <p>
          Our offer contains links to external third-party websites, the content of which 
          we have no influence over. Therefore, we cannot assume any liability for this 
          external content. The respective provider or operator of the pages is always 
          responsible for the content of the linked pages. The linked pages were checked 
          for possible legal violations at the time of linking. Illegal content was not 
          recognizable at the time of linking.
        </p>
        <p>
          However, permanent content control of the linked pages is not reasonable without 
          concrete evidence of a legal violation. Upon becoming aware of legal violations, 
          we will remove such links immediately.
        </p>

        <h2>Copyright</h2>
        <p>
          The content and works created by the site operators on these pages are subject 
          to German copyright law. The reproduction, editing, distribution and any kind 
          of exploitation outside the limits of copyright require the written consent of 
          the respective author or creator. Downloads and copies of this site are only 
          permitted for private, non-commercial use.
        </p>
        <p>
          Insofar as the content on this site was not created by the operator, the copyrights 
          of third parties are respected. In particular, third-party content is marked as such. 
          Should you nevertheless become aware of a copyright infringement, please inform us 
          accordingly. Upon becoming aware of legal violations, we will remove such content 
          immediately.
        </p>

        <div className="mt-8 pt-6 border-t border-border">
          <p className="text-sm">
            You can find further legal information in our{" "}
            <Link href="/datenschutz" data-testid="link-datenschutz-impressum">Privacy Policy</Link> and 
            our <Link href="/agb" data-testid="link-agb-impressum">General Terms and Conditions</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
