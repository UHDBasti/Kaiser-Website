import { NodeBackground } from "@/components/ui/NodeBackground";
import { useLanguage } from "@/lib/i18n";
import { Link } from "wouter";

export default function AGB() {
  const { language } = useLanguage();

  if (language === "en") {
    return <AGBEN />;
  }

  return <AGBDE />;
}

function AGBDE() {
  return (
    <div className="min-h-screen w-full pt-24 pb-20">
      <NodeBackground />
      <div className="max-w-3xl mx-auto px-4 relative z-10 prose prose-invert prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-a:text-primary">
        <h1 data-testid="text-agb-title">Allgemeine Geschäftsbedingungen (AGB)</h1>
        <p className="text-sm text-muted-foreground">Stand: Dezember 2025</p>

        <h2>§ 1 Geltungsbereich</h2>
        <p>
          (1) Diese Allgemeinen Geschäftsbedingungen (nachfolgend „AGB") gelten für alle Verträge 
          zwischen Kaiser-Service, Sebastian Kaiser, 23568 Lübeck (nachfolgend „Anbieter") und 
          dem Kunden (nachfolgend „Auftraggeber") über Dienstleistungen im Bereich AI-Beratung, 
          KI Voice Agents, N8N-Workflow-Automatisierung und Mitarbeiterschulungen.
        </p>
        <p>
          (2) Abweichende Geschäftsbedingungen des Auftraggebers werden nicht anerkannt, es sei 
          denn, der Anbieter stimmt ihrer Geltung ausdrücklich schriftlich zu.
        </p>
        <p>
          (3) Diese AGB gelten sowohl gegenüber Verbrauchern als auch gegenüber Unternehmern, 
          es sei denn, in der jeweiligen Klausel wird eine Differenzierung vorgenommen. 
          Verbraucher im Sinne dieser AGB ist jede natürliche Person, die ein Rechtsgeschäft 
          zu Zwecken abschließt, die überwiegend weder ihrer gewerblichen noch ihrer 
          selbständigen beruflichen Tätigkeit zugerechnet werden können (§ 13 BGB).
        </p>

        <h2>§ 2 Vertragsgegenstand und Leistungsbeschreibung</h2>
        <p>
          (1) Der Anbieter erbringt Dienstleistungen in folgenden Bereichen:
        </p>
        <ul>
          <li><strong>KI Voice Agents:</strong> Entwicklung, Implementierung und Wartung von 
            KI-gestützten Sprachassistenten für Kundenservice, Vertrieb und interne Prozesse</li>
          <li><strong>N8N-Workflow-Automatisierung:</strong> Erstellung und Integration von 
            automatisierten Workflows zur Prozessoptimierung</li>
          <li><strong>AI-Beratung:</strong> Strategische Beratung zur Integration von 
            KI-Technologien in bestehende Geschäftsprozesse</li>
          <li><strong>Mitarbeiterschulungen:</strong> Schulungen und Workshops zu KI-Technologien, 
            Automatisierung und digitaler Transformation</li>
        </ul>
        <p>
          (2) Der genaue Leistungsumfang ergibt sich aus dem jeweiligen Angebot bzw. der 
          Leistungsbeschreibung im Einzelvertrag.
        </p>
        <p>
          (3) Der Anbieter behält sich das Recht vor, die Leistungen ohne Qualitätsminderung 
          anzupassen, soweit dies für den Auftraggeber zumutbar ist.
        </p>

        <h2>§ 3 Vertragsschluss</h2>
        <p>
          (1) Die Darstellung der Dienstleistungen auf der Website stellt kein rechtlich 
          bindendes Angebot, sondern eine unverbindliche Aufforderung zur Angebotsabgabe dar.
        </p>
        <p>
          (2) Durch Absenden einer Anfrage über das Kontaktformular oder per E-Mail gibt der 
          Auftraggeber ein unverbindliches Interesse an einer Zusammenarbeit bekannt.
        </p>
        <p>
          (3) Der Anbieter erstellt daraufhin ein individuelles Angebot. Der Vertrag kommt 
          durch schriftliche Annahme des Angebots (per E-Mail oder unterschriebenem Vertrag) 
          durch den Auftraggeber zustande.
        </p>
        <p>
          (4) Der Anbieter bestätigt den Vertragsschluss unverzüglich per E-Mail.
        </p>

        <h2>§ 4 Mitwirkungspflichten des Auftraggebers</h2>
        <p>
          (1) Der Auftraggeber stellt dem Anbieter alle für die Durchführung der Leistungen 
          erforderlichen Informationen, Zugänge und Unterlagen rechtzeitig und vollständig 
          zur Verfügung.
        </p>
        <p>
          (2) Der Auftraggeber benennt einen Ansprechpartner, der während der Projektlaufzeit 
          für Rückfragen zur Verfügung steht und Entscheidungen treffen kann.
        </p>
        <p>
          (3) Verzögerungen, die durch mangelhafte oder verspätete Mitwirkung des Auftraggebers 
          entstehen, gehen nicht zu Lasten des Anbieters. Eventuell vereinbarte Fristen 
          verlängern sich entsprechend.
        </p>

        <h2>§ 5 Vergütung und Zahlungsbedingungen</h2>
        <p>
          (1) Die Vergütung ergibt sich aus dem jeweiligen Angebot. Alle Preise verstehen sich 
          in Euro und zuzüglich der gesetzlichen Mehrwertsteuer, sofern diese ausgewiesen ist.
        </p>
        <p>
          (2) Rechnungen sind innerhalb von 14 Tagen nach Rechnungsstellung ohne Abzug zahlbar, 
          sofern nicht anders vereinbart.
        </p>
        <p>
          (3) Bei größeren Projekten kann eine Anzahlung von bis zu 50% des Auftragswertes 
          bei Vertragsschluss vereinbart werden.
        </p>
        <p>
          (4) Akzeptierte Zahlungsarten: Überweisung, PayPal.
        </p>
        <p>
          (5) Bei Zahlungsverzug ist der Anbieter berechtigt, Verzugszinsen in Höhe von 5 
          Prozentpunkten über dem jeweiligen Basiszinssatz bei Verbrauchern bzw. 9 
          Prozentpunkten über dem Basiszinssatz bei Unternehmern zu berechnen.
        </p>

        <h2>§ 6 Widerrufsrecht für Verbraucher</h2>
        <div className="bg-muted/20 p-4 rounded-lg my-4">
          <h3 className="mt-0">Widerrufsbelehrung</h3>
          <p>
            <strong>Widerrufsrecht</strong><br />
            Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag 
            zu widerrufen. Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag des Vertragsschlusses.
          </p>
          <p>
            Um Ihr Widerrufsrecht auszuüben, müssen Sie uns
          </p>
          <p>
            <strong>Kaiser-Service</strong><br />
            Sebastian Kaiser<br />
            23568 Lübeck<br />
            E-Mail: Service-Kaiser@proton.me
          </p>
          <p>
            mittels einer eindeutigen Erklärung (z. B. ein mit der Post versandter Brief oder 
            eine E-Mail) über Ihren Entschluss, diesen Vertrag zu widerrufen, informieren. 
            Sie können dafür das beigefügte Muster-Widerrufsformular verwenden, das jedoch 
            nicht vorgeschrieben ist.
          </p>
          <p>
            Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die Mitteilung über die 
            Ausübung des Widerrufsrechts vor Ablauf der Widerrufsfrist absenden.
          </p>
          <p>
            <strong>Folgen des Widerrufs</strong><br />
            Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von 
            Ihnen erhalten haben, unverzüglich und spätestens binnen vierzehn Tagen ab dem Tag 
            zurückzuzahlen, an dem die Mitteilung über Ihren Widerruf dieses Vertrags bei uns 
            eingegangen ist. Für diese Rückzahlung verwenden wir dasselbe Zahlungsmittel, das 
            Sie bei der ursprünglichen Transaktion eingesetzt haben, es sei denn, mit Ihnen 
            wurde ausdrücklich etwas anderes vereinbart.
          </p>
          <p>
            <strong>Besonderer Hinweis:</strong><br />
            Haben Sie verlangt, dass die Dienstleistung während der Widerrufsfrist beginnen 
            soll, so haben Sie uns einen angemessenen Betrag zu zahlen, der dem Anteil der 
            bis zu dem Zeitpunkt, zu dem Sie uns von der Ausübung des Widerrufsrechts 
            hinsichtlich dieses Vertrags unterrichten, bereits erbrachten Dienstleistungen 
            im Vergleich zum Gesamtumfang der im Vertrag vorgesehenen Dienstleistungen entspricht.
          </p>
        </div>

        <h3>Muster-Widerrufsformular</h3>
        <div className="bg-muted/20 p-4 rounded-lg my-4">
          <p>
            <em>(Wenn Sie den Vertrag widerrufen wollen, dann füllen Sie bitte dieses Formular 
            aus und senden Sie es zurück.)</em>
          </p>
          <p>
            An Kaiser-Service, Sebastian Kaiser, 23568 Lübeck, E-Mail: Service-Kaiser@proton.me
          </p>
          <p>
            Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen Vertrag über 
            die Erbringung der folgenden Dienstleistung (*):<br />
            _____________________________________________<br />
            Bestellt am (*)/erhalten am (*):<br />
            _____________________________________________<br />
            Name des/der Verbraucher(s):<br />
            _____________________________________________<br />
            Anschrift des/der Verbraucher(s):<br />
            _____________________________________________<br />
            Datum:<br />
            _____________________________________________<br />
            Unterschrift des/der Verbraucher(s) (nur bei Mitteilung auf Papier)<br />
            _____________________________________________<br />
            (*) Unzutreffendes streichen.
          </p>
        </div>

        <h2>§ 7 Gewährleistung und Mängelansprüche</h2>
        <p>
          (1) Der Anbieter erbringt seine Leistungen nach dem aktuellen Stand der Technik 
          und mit der erforderlichen Sorgfalt eines ordentlichen Kaufmanns.
        </p>
        <p>
          (2) Mängel sind dem Anbieter unverzüglich, spätestens jedoch innerhalb von 14 Tagen 
          nach Feststellung, schriftlich mitzuteilen.
        </p>
        <p>
          (3) Bei berechtigten Mängelrügen wird der Anbieter nach seiner Wahl zunächst 
          Nacherfüllung (Nachbesserung oder Ersatzlieferung) leisten.
        </p>
        <p>
          (4) Schlägt die Nacherfüllung fehl, kann der Auftraggeber nach seiner Wahl 
          Minderung verlangen oder vom Vertrag zurücktreten.
        </p>
        <p>
          (5) Die Gewährleistungsfrist beträgt zwei Jahre für Verbraucher und ein Jahr 
          für Unternehmer, gerechnet ab Abnahme der Leistung.
        </p>

        <h2>§ 8 Haftung und Haftungsbeschränkung</h2>
        <p>
          (1) Der Anbieter haftet unbeschränkt für Schäden aus der Verletzung des Lebens, 
          des Körpers oder der Gesundheit, die auf einer fahrlässigen oder vorsätzlichen 
          Pflichtverletzung des Anbieters oder seiner gesetzlichen Vertreter oder 
          Erfüllungsgehilfen beruhen.
        </p>
        <p>
          (2) Der Anbieter haftet unbeschränkt für sonstige Schäden, die auf vorsätzlicher 
          oder grob fahrlässiger Pflichtverletzung des Anbieters oder seiner gesetzlichen 
          Vertreter oder Erfüllungsgehilfen beruhen.
        </p>
        <p>
          (3) Bei leicht fahrlässiger Verletzung wesentlicher Vertragspflichten 
          (Kardinalpflichten) ist die Haftung des Anbieters der Höhe nach begrenzt auf 
          den typischerweise vorhersehbaren Schaden. Wesentliche Vertragspflichten sind 
          solche, deren Erfüllung die ordnungsgemäße Durchführung des Vertrages überhaupt 
          erst ermöglicht und auf deren Einhaltung der Vertragspartner regelmäßig 
          vertrauen darf.
        </p>
        <p>
          (4) Im Übrigen ist die Haftung des Anbieters für leicht fahrlässig verursachte 
          Schäden ausgeschlossen.
        </p>
        <p>
          (5) Die vorstehenden Haftungsbeschränkungen gelten nicht für Ansprüche aus 
          dem Produkthaftungsgesetz sowie für arglistig verschwiegene Mängel und 
          zugesicherte Eigenschaften.
        </p>
        <p>
          (6) Der Anbieter haftet nicht für Schäden, die durch fehlerhafte oder 
          verspätete Mitwirkung des Auftraggebers entstehen.
        </p>

        <h2>§ 9 Nutzungsrechte und geistiges Eigentum</h2>
        <p>
          (1) Der Auftraggeber erhält nach vollständiger Bezahlung ein einfaches, 
          nicht übertragbares Nutzungsrecht an den im Rahmen des Vertrags erstellten 
          Arbeitsergebnissen für den vereinbarten Zweck.
        </p>
        <p>
          (2) Konzepte, Methoden, Know-how und allgemeine Entwicklungswerkzeuge des 
          Anbieters, die bei der Leistungserbringung eingesetzt werden, verbleiben 
          im Eigentum des Anbieters.
        </p>
        <p>
          (3) Der Anbieter ist berechtigt, allgemein erworbenes Know-how auch für 
          andere Projekte zu nutzen, sofern dabei keine vertraulichen Informationen 
          des Auftraggebers offengelegt werden.
        </p>

        <h2>§ 10 Vertraulichkeit und Datenschutz</h2>
        <p>
          (1) Beide Parteien verpflichten sich, alle im Rahmen des Vertragsverhältnisses 
          erlangten vertraulichen Informationen vertraulich zu behandeln und nur für 
          Zwecke des Vertrages zu verwenden.
        </p>
        <p>
          (2) Die Verarbeitung personenbezogener Daten erfolgt gemäß unserer 
          Datenschutzerklärung: <Link href="/datenschutz">Datenschutzerklärung</Link>
        </p>
        <p>
          (3) Sofern der Anbieter im Auftrag des Auftraggebers personenbezogene Daten 
          verarbeitet, wird ein gesonderter Auftragsverarbeitungsvertrag nach Art. 28 
          DSGVO abgeschlossen.
        </p>

        <h2>§ 11 Vertragslaufzeit und Kündigung</h2>
        <p>
          (1) Die Vertragslaufzeit ergibt sich aus dem jeweiligen Einzelvertrag.
        </p>
        <p>
          (2) Bei Dauerschuldverhältnissen ist eine ordentliche Kündigung mit einer 
          Frist von 4 Wochen zum Monatsende möglich, sofern nicht anders vereinbart.
        </p>
        <p>
          (3) Das Recht zur außerordentlichen Kündigung aus wichtigem Grund bleibt 
          unberührt.
        </p>
        <p>
          (4) Kündigungen bedürfen der Textform (E-Mail ist ausreichend).
        </p>

        <h2>§ 12 Schlussbestimmungen</h2>
        <p>
          (1) Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des 
          UN-Kaufrechts. Bei Verbrauchern gilt diese Rechtswahl nur, soweit nicht 
          zwingende verbraucherschützende Bestimmungen des Aufenthaltsstaates 
          entgegenstehen.
        </p>
        <p>
          (2) Sofern der Auftraggeber Kaufmann, juristische Person des öffentlichen 
          Rechts oder öffentlich-rechtliches Sondervermögen ist, ist Gerichtsstand 
          für alle Streitigkeiten aus diesem Vertrag Lübeck.
        </p>
        <p>
          (3) Sollten einzelne Bestimmungen dieser AGB unwirksam sein oder werden, 
          bleibt die Wirksamkeit der übrigen Bestimmungen unberührt. Anstelle der 
          unwirksamen Bestimmung gilt eine dem wirtschaftlichen Zweck am nächsten 
          kommende wirksame Regelung als vereinbart.
        </p>

        <h2>§ 13 Online-Streitbeilegung und Verbraucherschlichtung</h2>
        <p>
          (1) Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
          <a 
            href="https://ec.europa.eu/consumers/odr/" 
            target="_blank" 
            rel="noopener noreferrer"
            data-testid="link-eu-odr-agb"
          >
            https://ec.europa.eu/consumers/odr/
          </a>
        </p>
        <p>
          (2) Unsere E-Mail-Adresse finden Sie im Impressum dieser Website.
        </p>
        <p>
          (3) Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren 
          vor einer Verbraucherschlichtungsstelle teilzunehmen.
        </p>

        <div className="mt-8 pt-6 border-t border-border">
          <p className="text-sm">
            Weitere rechtliche Informationen finden Sie in unserem{" "}
            <Link href="/impressum" data-testid="link-impressum-agb">Impressum</Link> und 
            unserer <Link href="/datenschutz" data-testid="link-datenschutz-agb">Datenschutzerklärung</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}

function AGBEN() {
  return (
    <div className="min-h-screen w-full pt-24 pb-20">
      <NodeBackground />
      <div className="max-w-3xl mx-auto px-4 relative z-10 prose prose-invert prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-a:text-primary">
        <h1 data-testid="text-agb-title">General Terms and Conditions (GTC)</h1>
        <p className="text-sm text-muted-foreground">Version: December 2025</p>

        <h2>§ 1 Scope of Application</h2>
        <p>
          (1) These General Terms and Conditions (hereinafter "GTC") apply to all contracts 
          between Kaiser-Service, Sebastian Kaiser, 23568 Lübeck (hereinafter "Provider") and 
          the customer (hereinafter "Client") for services in the area of AI consulting, 
          AI Voice Agents, N8N workflow automation, and employee training.
        </p>
        <p>
          (2) Deviating terms and conditions of the Client are not recognized unless the 
          Provider expressly agrees to their validity in writing.
        </p>
        <p>
          (3) These GTC apply to both consumers and entrepreneurs unless differentiated in 
          the respective clause. A consumer within the meaning of these GTC is any natural 
          person who enters into a legal transaction for purposes that are predominantly 
          outside their trade, business, or profession (§ 13 BGB).
        </p>

        <h2>§ 2 Subject Matter and Service Description</h2>
        <p>
          (1) The Provider renders services in the following areas:
        </p>
        <ul>
          <li><strong>AI Voice Agents:</strong> Development, implementation, and maintenance 
            of AI-powered voice assistants for customer service, sales, and internal processes</li>
          <li><strong>N8N Workflow Automation:</strong> Creation and integration of automated 
            workflows for process optimization</li>
          <li><strong>AI Consulting:</strong> Strategic consulting for integrating AI 
            technologies into existing business processes</li>
          <li><strong>Employee Training:</strong> Training sessions and workshops on AI 
            technologies, automation, and digital transformation</li>
        </ul>
        <p>
          (2) The exact scope of services is determined by the respective offer or service 
          description in the individual contract.
        </p>
        <p>
          (3) The Provider reserves the right to adjust services without diminishing quality, 
          provided this is reasonable for the Client.
        </p>

        <h2>§ 3 Contract Conclusion</h2>
        <p>
          (1) The presentation of services on the website does not constitute a legally 
          binding offer but an invitation to submit an offer.
        </p>
        <p>
          (2) By submitting an inquiry via the contact form or email, the Client expresses 
          a non-binding interest in cooperation.
        </p>
        <p>
          (3) The Provider then prepares an individual offer. The contract is concluded 
          upon written acceptance of the offer (by email or signed contract) by the Client.
        </p>
        <p>
          (4) The Provider confirms the contract conclusion promptly by email.
        </p>

        <h2>§ 4 Client's Cooperation Obligations</h2>
        <p>
          (1) The Client shall provide the Provider with all information, access rights, and 
          documents required for the performance of services in a timely and complete manner.
        </p>
        <p>
          (2) The Client shall designate a contact person who is available for questions 
          during the project period and can make decisions.
        </p>
        <p>
          (3) Delays caused by inadequate or late cooperation from the Client shall not be 
          attributable to the Provider. Any agreed deadlines shall be extended accordingly.
        </p>

        <h2>§ 5 Remuneration and Payment Terms</h2>
        <p>
          (1) Remuneration is determined by the respective offer. All prices are in Euros 
          plus statutory VAT where applicable.
        </p>
        <p>
          (2) Invoices are payable within 14 days of invoice date without deduction, unless 
          otherwise agreed.
        </p>
        <p>
          (3) For larger projects, a down payment of up to 50% of the order value may be 
          agreed upon at contract conclusion.
        </p>
        <p>
          (4) Accepted payment methods: Bank transfer, PayPal.
        </p>
        <p>
          (5) In case of payment delay, the Provider is entitled to charge default interest 
          of 5 percentage points above the base rate for consumers and 9 percentage points 
          above the base rate for entrepreneurs.
        </p>

        <h2>§ 6 Right of Withdrawal for Consumers</h2>
        <div className="bg-muted/20 p-4 rounded-lg my-4">
          <h3 className="mt-0">Cancellation Policy</h3>
          <p>
            <strong>Right of Withdrawal</strong><br />
            You have the right to withdraw from this contract within fourteen days without 
            giving any reason. The withdrawal period is fourteen days from the day of contract 
            conclusion.
          </p>
          <p>
            To exercise your right of withdrawal, you must inform us
          </p>
          <p>
            <strong>Kaiser-Service</strong><br />
            Sebastian Kaiser<br />
            23568 Lübeck<br />
            Email: Service-Kaiser@proton.me
          </p>
          <p>
            of your decision to withdraw from this contract by an unequivocal statement 
            (e.g., a letter sent by post or email). You may use the attached model withdrawal 
            form, but it is not obligatory.
          </p>
          <p>
            To meet the withdrawal deadline, it is sufficient for you to send your communication 
            concerning your exercise of the right of withdrawal before the withdrawal period 
            has expired.
          </p>
          <p>
            <strong>Consequences of Withdrawal</strong><br />
            If you withdraw from this contract, we shall reimburse all payments received from 
            you without undue delay and no later than fourteen days from the day on which we 
            are informed about your decision to withdraw. We will use the same means of payment 
            as you used for the initial transaction, unless you have expressly agreed otherwise.
          </p>
          <p>
            <strong>Special Note:</strong><br />
            If you requested that the services should commence during the withdrawal period, 
            you shall pay us an amount proportionate to what has been provided until you 
            communicated to us your withdrawal from this contract, in comparison with the 
            full coverage of the contract.
          </p>
        </div>

        <h2>§ 7 Warranty and Defect Claims</h2>
        <p>
          (1) The Provider renders services according to the current state of technology and 
          with the due care of a prudent businessperson.
        </p>
        <p>
          (2) Defects must be reported to the Provider immediately in writing, but no later 
          than 14 days after discovery.
        </p>
        <p>
          (3) In case of justified defect claims, the Provider will initially provide 
          supplementary performance (repair or replacement) at their discretion.
        </p>
        <p>
          (4) If supplementary performance fails, the Client may, at their choice, demand 
          reduction or withdraw from the contract.
        </p>
        <p>
          (5) The warranty period is two years for consumers and one year for entrepreneurs, 
          calculated from acceptance of the service.
        </p>

        <h2>§ 8 Liability and Limitation of Liability</h2>
        <p>
          (1) The Provider is unlimitedly liable for damages arising from injury to life, 
          body, or health based on negligent or intentional breach of duty by the Provider, 
          its legal representatives, or vicarious agents.
        </p>
        <p>
          (2) The Provider is unlimitedly liable for other damages based on intentional or 
          grossly negligent breach of duty by the Provider, its legal representatives, or 
          vicarious agents.
        </p>
        <p>
          (3) In case of slightly negligent breach of material contractual obligations 
          (cardinal obligations), the Provider's liability is limited to the typically 
          foreseeable damage. Material contractual obligations are those whose fulfillment 
          enables the proper execution of the contract and on whose compliance the 
          contractual partner regularly relies.
        </p>
        <p>
          (4) Otherwise, the Provider's liability for slightly negligent damage is excluded.
        </p>
        <p>
          (5) The above limitations of liability do not apply to claims under the Product 
          Liability Act or for fraudulently concealed defects and guaranteed characteristics.
        </p>
        <p>
          (6) The Provider is not liable for damages caused by defective or delayed 
          cooperation by the Client.
        </p>

        <h2>§ 9 Usage Rights and Intellectual Property</h2>
        <p>
          (1) Upon full payment, the Client receives a simple, non-transferable right to 
          use the work results created under the contract for the agreed purpose.
        </p>
        <p>
          (2) Concepts, methods, know-how, and general development tools of the Provider 
          used in service provision remain the property of the Provider.
        </p>
        <p>
          (3) The Provider is entitled to use generally acquired know-how for other projects, 
          provided no confidential information of the Client is disclosed.
        </p>

        <h2>§ 10 Confidentiality and Data Protection</h2>
        <p>
          (1) Both parties agree to treat all confidential information obtained during the 
          contractual relationship as confidential and to use it only for contract purposes.
        </p>
        <p>
          (2) The processing of personal data is governed by our Privacy Policy:{" "}
          <Link href="/datenschutz">Privacy Policy</Link>
        </p>
        <p>
          (3) If the Provider processes personal data on behalf of the Client, a separate 
          data processing agreement pursuant to Art. 28 GDPR will be concluded.
        </p>

        <h2>§ 11 Contract Duration and Termination</h2>
        <p>
          (1) The contract duration is determined by the respective individual contract.
        </p>
        <p>
          (2) For continuing obligations, ordinary termination with a notice period of 4 
          weeks to the end of the month is possible, unless otherwise agreed.
        </p>
        <p>
          (3) The right to extraordinary termination for good cause remains unaffected.
        </p>
        <p>
          (4) Terminations require text form (email is sufficient).
        </p>

        <h2>§ 12 Final Provisions</h2>
        <p>
          (1) The law of the Federal Republic of Germany applies, excluding the UN Convention 
          on Contracts for the International Sale of Goods. For consumers, this choice of law 
          only applies insofar as mandatory consumer protection provisions of the country of 
          residence do not conflict.
        </p>
        <p>
          (2) If the Client is a merchant, legal entity under public law, or special fund 
          under public law, the place of jurisdiction for all disputes arising from this 
          contract is Lübeck.
        </p>
        <p>
          (3) Should individual provisions of these GTC be or become invalid, the validity 
          of the remaining provisions shall remain unaffected. Instead of the invalid 
          provision, an effective regulation that comes closest to the economic purpose 
          shall be deemed agreed.
        </p>

        <h2>§ 13 Online Dispute Resolution and Consumer Arbitration</h2>
        <p>
          (1) The European Commission provides a platform for online dispute resolution (ODR):{" "}
          <a 
            href="https://ec.europa.eu/consumers/odr/" 
            target="_blank" 
            rel="noopener noreferrer"
            data-testid="link-eu-odr-agb"
          >
            https://ec.europa.eu/consumers/odr/
          </a>
        </p>
        <p>
          (2) Our email address can be found in the Legal Notice (Impressum) of this website.
        </p>
        <p>
          (3) We are not willing or obliged to participate in dispute resolution proceedings 
          before a consumer arbitration board.
        </p>

        <div className="mt-8 pt-6 border-t border-border">
          <p className="text-sm">
            You can find further legal information in our{" "}
            <Link href="/impressum" data-testid="link-impressum-agb">Legal Notice</Link> and 
            our <Link href="/datenschutz" data-testid="link-datenschutz-agb">Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
