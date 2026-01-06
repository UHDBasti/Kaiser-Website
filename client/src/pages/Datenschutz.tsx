import { NodeBackground } from "@/components/ui/NodeBackground";
import { useLanguage } from "@/lib/i18n";
import { Link } from "wouter";

export default function Datenschutz() {
  const { language } = useLanguage();

  if (language === "en") {
    return <PrivacyPolicyEN />;
  }

  return <PrivacyPolicyDE />;
}

function PrivacyPolicyDE() {
  return (
    <div className="min-h-screen w-full pt-24 pb-20">
      <NodeBackground />
      <div className="max-w-3xl mx-auto px-4 relative z-10 prose prose-invert prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-a:text-primary">
        <h1 data-testid="text-privacy-title">Datenschutzerklärung</h1>
        <p className="text-sm text-muted-foreground">Stand: Dezember 2025</p>

        <h2>1. Datenschutz auf einen Blick</h2>
        
        <h3>Allgemeine Hinweise</h3>
        <p>
          Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, 
          wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert 
          werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten 
          Datenschutzerklärung.
        </p>

        <h3>Datenerfassung auf dieser Website</h3>
        <p>
          <strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong><br />
          Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem 
          Abschnitt „Verantwortliche Stelle" in dieser Datenschutzerklärung entnehmen.
        </p>
        <p>
          <strong>Wie erfassen wir Ihre Daten?</strong><br />
          Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um Daten handeln, 
          die Sie in ein Kontaktformular eingeben oder bei der Forum-Registrierung angeben. Andere Daten werden automatisch 
          oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische 
          Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs).
        </p>
        <p>
          <strong>Wofür nutzen wir Ihre Daten?</strong><br />
          Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können 
          zur Analyse Ihres Nutzerverhaltens verwendet werden. Mit Ihrer Einwilligung nutzen wir Daten auch für externe Dienste 
          wie unseren Voice Agent.
        </p>
        <p>
          <strong>Welche Rechte haben Sie bezüglich Ihrer Daten?</strong><br />
          Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten 
          personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu 
          verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt haben, können Sie diese Einwilligung jederzeit 
          für die Zukunft widerrufen. Außerdem haben Sie das Recht, unter bestimmten Umständen die Einschränkung der Verarbeitung 
          Ihrer personenbezogenen Daten zu verlangen. Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen 
          Aufsichtsbehörde zu.
        </p>

        <h2>2. Verantwortliche Stelle</h2>
        <p>
          Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:
        </p>
        <p>
          <strong>Kaiser-Service</strong><br />
          Sebastian Kaiser<br />
          23568 Lübeck<br />
          Deutschland
        </p>
        <p>
          E-Mail: <a href="mailto:Service-Kaiser@proton.me">Service-Kaiser@proton.me</a>
        </p>
        <p>
          Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit anderen über die 
          Zwecke und Mittel der Verarbeitung von personenbezogenen Daten (z. B. Namen, E-Mail-Adressen o. Ä.) entscheidet.
        </p>

        <h2>3. Hosting</h2>
        <p>
          Wir hosten die Inhalte unserer Website bei folgendem Anbieter:
        </p>
        <h3>Replit</h3>
        <p>
          Anbieter ist Replit, Inc., 548 Market St Suite 71100, San Francisco, CA 94104, USA.
        </p>
        <p>
          <strong>Hinweis zur Datenübertragung in die USA:</strong> Replit ist ein US-amerikanischer Anbieter. Es kann daher 
          zu einer Übermittlung von Daten in die USA kommen. Die USA werden vom Europäischen Gerichtshof als ein Land mit 
          einem nach EU-Standards unzureichenden Datenschutzniveau eingestuft. Es besteht insbesondere das Risiko, dass Ihre 
          Daten durch US-Behörden zu Kontroll- und Überwachungszwecken verarbeitet werden.
        </p>
        <p>
          Details entnehmen Sie der Datenschutzerklärung von Replit:{" "}
          <a href="https://replit.com/site/privacy" target="_blank" rel="noopener noreferrer">
            https://replit.com/site/privacy
          </a>
        </p>
        <p>
          Die Verwendung von Replit erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Wir haben ein berechtigtes Interesse 
          an einer möglichst zuverlässigen Darstellung unserer Website.
        </p>

        <h2>4. Allgemeine Hinweise und Pflichtinformationen</h2>
        
        <h3>Datenschutz</h3>
        <p>
          Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen 
          Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
        </p>
        <p>
          Wenn Sie diese Website benutzen, werden verschiedene personenbezogene Daten erhoben. Die vorliegende Datenschutzerklärung 
          erläutert, welche Daten wir erheben und wofür wir sie nutzen. Sie erläutert auch, wie und zu welchem Zweck das geschieht.
        </p>
        <p>
          Wir weisen darauf hin, dass die Datenübertragung im Internet (z. B. bei der Kommunikation per E-Mail) Sicherheitslücken 
          aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich.
        </p>

        <h3>Speicherdauer</h3>
        <p>
          Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt wurde, verbleiben Ihre 
          personenbezogenen Daten bei uns, bis der Zweck für die Datenverarbeitung entfällt. Wenn Sie ein berechtigtes Löschersuchen 
          geltend machen oder eine Einwilligung zur Datenverarbeitung widerrufen, werden Ihre Daten gelöscht, sofern wir keine 
          anderen rechtlich zulässigen Gründe für die Speicherung Ihrer personenbezogenen Daten haben.
        </p>
        <p>
          <strong>Übersicht unserer Speicherdauern:</strong>
        </p>
        <ul>
          <li>Server-Log-Dateien: 7 Tage</li>
          <li>Cookie-Einwilligungsdaten: 1 Jahr</li>
          <li>Kontaktanfragen: 2 Jahre nach letztem Kontakt</li>
          <li>Forum-Benutzerdaten: Bis zur Kontolöschung</li>
          <li>Forum-Beiträge: Unbegrenzt (öffentliche Inhalte)</li>
        </ul>

        <h3>Hinweis zur Datenweitergabe in die USA und sonstige Drittstaaten</h3>
        <p>
          Wir verwenden unter anderem Tools von Unternehmen mit Sitz in den USA oder sonstigen datenschutzrechtlich nicht sicheren 
          Drittstaaten. Wenn diese Tools aktiv sind, können Ihre personenbezogene Daten in diese Drittstaaten übertragen und dort 
          verarbeitet werden. Wir weisen darauf hin, dass in diesen Ländern kein mit der EU vergleichbares Datenschutzniveau 
          garantiert werden kann.
        </p>
        <p>
          Insbesondere US-Unternehmen sind verpflichtet, personenbezogene Daten an Sicherheitsbehörden herauszugeben, ohne dass 
          Sie als Betroffener hiergegen gerichtlich vorgehen könnten. Es kann daher nicht ausgeschlossen werden, dass US-Behörden 
          (z. B. Geheimdienste) Ihre auf US-Servern befindlichen Daten zu Überwachungszwecken verarbeiten, auswerten und 
          dauerhaft speichern.
        </p>

        <h3>Widerruf Ihrer Einwilligung zur Datenverarbeitung</h3>
        <p>
          Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Sie können eine bereits erteilte 
          Einwilligung jederzeit widerrufen. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf 
          unberührt.
        </p>
        <p>
          Zum Widerruf Ihrer Cookie-Einwilligung nutzen Sie bitte die Schaltfläche "Cookie-Einstellungen" im Footer dieser 
          Website oder kontaktieren Sie uns per E-Mail.
        </p>

        <h3>Widerspruchsrecht gegen die Datenerhebung in besonderen Fällen (Art. 21 DSGVO)</h3>
        <p className="bg-muted/20 p-4 rounded-lg">
          <strong>WENN DIE DATENVERARBEITUNG AUF GRUNDLAGE VON ART. 6 ABS. 1 LIT. E ODER F DSGVO ERFOLGT, HABEN SIE JEDERZEIT DAS 
          RECHT, AUS GRÜNDEN, DIE SICH AUS IHRER BESONDEREN SITUATION ERGEBEN, GEGEN DIE VERARBEITUNG IHRER PERSONENBEZOGENEN DATEN 
          WIDERSPRUCH EINZULEGEN. DIE JEWEILIGE RECHTSGRUNDLAGE, AUF DENEN EINE VERARBEITUNG BERUHT, ENTNEHMEN SIE DIESER 
          DATENSCHUTZERKLÄRUNG. WENN SIE WIDERSPRUCH EINLEGEN, WERDEN WIR IHRE BETROFFENEN PERSONENBEZOGENEN DATEN NICHT MEHR 
          VERARBEITEN, ES SEI DENN, WIR KÖNNEN ZWINGENDE SCHUTZWÜRDIGE GRÜNDE FÜR DIE VERARBEITUNG NACHWEISEN.</strong>
        </p>

        <h3>Beschwerderecht bei der zuständigen Aufsichtsbehörde</h3>
        <p>
          Im Falle von Verstößen gegen die DSGVO steht den Betroffenen ein Beschwerderecht bei einer Aufsichtsbehörde zu. 
          Die zuständige Aufsichtsbehörde für Schleswig-Holstein ist:
        </p>
        <p>
          <strong>Unabhängiges Landeszentrum für Datenschutz Schleswig-Holstein (ULD)</strong><br />
          Holstenstraße 98<br />
          24103 Kiel<br />
          Tel.: 0431 988-1200<br />
          E-Mail: mail@datenschutzzentrum.de<br />
          Website:{" "}
          <a href="https://www.datenschutzzentrum.de" target="_blank" rel="noopener noreferrer">
            https://www.datenschutzzentrum.de
          </a>
        </p>

        <h3>Recht auf Datenübertragbarkeit</h3>
        <p>
          Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung oder in Erfüllung eines Vertrags automatisiert 
          verarbeiten, an sich oder an einen Dritten in einem gängigen, maschinenlesbaren Format aushändigen zu lassen.
        </p>

        <h3>Auskunft, Berichtigung und Löschung</h3>
        <p>
          Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf unentgeltliche Auskunft über Ihre 
          gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung und ggf. ein 
          Recht auf Berichtigung oder Löschung dieser Daten. Hierzu sowie zu weiteren Fragen zum Thema personenbezogene Daten 
          können Sie sich jederzeit an uns wenden.
        </p>

        <h3>Recht auf Einschränkung der Verarbeitung</h3>
        <p>
          Sie haben das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen. Hierzu können Sie 
          sich jederzeit an uns wenden. Das Recht auf Einschränkung der Verarbeitung besteht in folgenden Fällen:
        </p>
        <ul>
          <li>Wenn Sie die Richtigkeit Ihrer bei uns gespeicherten personenbezogenen Daten bestreiten</li>
          <li>Wenn die Verarbeitung unrechtmäßig ist, Sie aber die Löschung ablehnen</li>
          <li>Wenn wir die Daten nicht mehr benötigen, Sie diese aber zur Ausübung von Rechtsansprüchen brauchen</li>
          <li>Wenn Sie Widerspruch nach Art. 21 Abs. 1 DSGVO eingelegt haben</li>
        </ul>

        <h2>5. Datenerfassung auf dieser Website</h2>
        
        <h3>Cookies</h3>
        <p>
          Unsere Internetseiten verwenden so genannte „Cookies". Cookies sind kleine Datenpakete und richten auf Ihrem Endgerät 
          keinen Schaden an. Sie werden entweder vorübergehend für die Dauer einer Sitzung (Session-Cookies) oder dauerhaft 
          (permanente Cookies) auf Ihrem Endgerät gespeichert.
        </p>

        <h4>Technisch notwendige Cookies (keine Einwilligung erforderlich)</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-muted/20">
                <th className="px-3 py-2 text-left">Cookie</th>
                <th className="px-3 py-2 text-left">Anbieter</th>
                <th className="px-3 py-2 text-left">Zweck</th>
                <th className="px-3 py-2 text-left">Speicherdauer</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-3 py-2 border-b border-border">connect.sid</td>
                <td className="px-3 py-2 border-b border-border">Kaiser-Service</td>
                <td className="px-3 py-2 border-b border-border">Benutzer-Session (Login-Status)</td>
                <td className="px-3 py-2 border-b border-border">Sitzung</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border-b border-border">cookie_consent</td>
                <td className="px-3 py-2 border-b border-border">Kaiser-Service</td>
                <td className="px-3 py-2 border-b border-border">Speicherung der Cookie-Einwilligung</td>
                <td className="px-3 py-2 border-b border-border">1 Jahr</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Bereitstellung der 
          Website-Funktionen) i.V.m. § 25 Abs. 2 Nr. 2 TDDDG
        </p>

        <h4>Funktionale Cookies (Einwilligung erforderlich)</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-muted/20">
                <th className="px-3 py-2 text-left">Cookie</th>
                <th className="px-3 py-2 text-left">Anbieter</th>
                <th className="px-3 py-2 text-left">Zweck</th>
                <th className="px-3 py-2 text-left">Speicherdauer</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-3 py-2 border-b border-border">language</td>
                <td className="px-3 py-2 border-b border-border">Kaiser-Service</td>
                <td className="px-3 py-2 border-b border-border">Speicherung der Sprachpräferenz (DE/EN)</td>
                <td className="px-3 py-2 border-b border-border">1 Jahr</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. a DSGVO (Einwilligung) i.V.m. § 25 Abs. 1 TDDDG
        </p>

        <h4>Externe Dienste-Cookies (Einwilligung erforderlich)</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-muted/20">
                <th className="px-3 py-2 text-left">Cookie/Dienst</th>
                <th className="px-3 py-2 text-left">Anbieter</th>
                <th className="px-3 py-2 text-left">Zweck</th>
                <th className="px-3 py-2 text-left">Drittland</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-3 py-2 border-b border-border">Eleven Labs Voice Agent</td>
                <td className="px-3 py-2 border-b border-border">ElevenLabs, Inc., USA</td>
                <td className="px-3 py-2 border-b border-border">KI-Sprachassistent für Kundendemos</td>
                <td className="px-3 py-2 border-b border-border">USA ⚠️</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          <strong>Hinweis Drittlandübertragung:</strong> Bei Aktivierung des Voice Agents werden Daten an Server in den USA 
          übertragen. Es besteht kein Angemessenheitsbeschluss nach Art. 45 DSGVO für die USA für Datenübertragungen an 
          ElevenLabs. Sie haben das Risiko, dass Ihre Daten ggf. von US-Behörden zu Kontroll- und Überwachungszwecken 
          verarbeitet werden können, ohne dass Ihnen wirksame Rechtsbehelfe zustehen.
        </p>
        <p>
          <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. a DSGVO (ausdrückliche Einwilligung) i.V.m. Art. 49 Abs. 1 lit. a 
          DSGVO (Einwilligung in Drittlandübertragung)
        </p>

        <h4>Cookie-Einwilligung verwalten</h4>
        <p>
          Sie können Ihre Cookie-Einstellungen jederzeit über den Button „Cookie-Einstellungen" im Footer dieser Website anpassen 
          oder Ihre Einwilligung widerrufen.
        </p>

        <h3>Protokollierung der Cookie-Einwilligung</h3>
        <p>
          Um der gesetzlichen Nachweispflicht nachzukommen, protokollieren wir Ihre Cookie-Einwilligung. Dabei werden folgende 
          Daten gespeichert:
        </p>
        <ul>
          <li>Zeitpunkt der Einwilligung</li>
          <li>Erteilte/verweigerte Kategorien</li>
          <li>Gekürzte IP-Adresse (letzte Stelle anonymisiert)</li>
          <li>User-Agent des Browsers</li>
        </ul>
        <p>
          <strong>Speicherdauer:</strong> 3 Jahre (gemäß DSGVO-Nachweispflicht)<br />
          <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. c DSGVO (rechtliche Verpflichtung) i.V.m. Art. 7 Abs. 1 DSGVO 
          (Nachweispflicht)
        </p>

        <h3>Server-Log-Dateien</h3>
        <p>
          Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, die Ihr 
          Browser automatisch an uns übermittelt. Dies sind:
        </p>
        <ul>
          <li>Browsertyp und Browserversion</li>
          <li>verwendetes Betriebssystem</li>
          <li>Referrer URL</li>
          <li>Hostname des zugreifenden Rechners</li>
          <li>Uhrzeit der Serveranfrage</li>
          <li>IP-Adresse</li>
        </ul>
        <p>
          <strong>Speicherdauer:</strong> 7 Tage<br />
          <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO (berechtigte Interessen an Sicherheit und Optimierung)
        </p>
        <p>
          Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen.
        </p>

        <h3>Kontaktformular</h3>
        <p>
          Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der 
          von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns 
          gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
        </p>
        <p>
          <strong>Erhobene Daten:</strong> Name, E-Mail-Adresse, Nachricht, ggf. Telefonnummer<br />
          <strong>Speicherdauer:</strong> 2 Jahre nach letztem Kontakt<br />
          <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung / vorvertragliche Maßnahmen) oder 
          Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse)
        </p>

        <h3>Registrierung auf dieser Website (Forum)</h3>
        <p>
          Sie können sich auf dieser Website registrieren, um zusätzliche Funktionen auf der Seite zu nutzen (Community-Forum). 
          Die dazu eingegebenen Daten verwenden wir nur zum Zwecke der Nutzung des jeweiligen Angebotes oder Dienstes.
        </p>
        <p>
          <strong>Erhobene Daten:</strong> Benutzername, E-Mail-Adresse, Passwort (verschlüsselt gespeichert), ggf. Anzeigename
        </p>
        <p>
          Die bei der Registrierung abgefragten Pflichtangaben müssen vollständig angegeben werden. Anderenfalls werden wir 
          die Registrierung ablehnen.
        </p>
        <p>
          <strong>Speicherdauer:</strong> Bis zur Löschung des Benutzerkontos<br />
          <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung - Nutzungsvertrag für das Forum)
        </p>
        <p>
          Forum-Beiträge bleiben auch nach Kontolöschung erhalten, werden aber anonymisiert (Benutzername wird entfernt).
        </p>

        <h2>6. Externe Dienste und Datenempfänger</h2>
        
        <h3>Eleven Labs (Voice Agent)</h3>
        <p>
          Auf dieser Website nutzen wir Eleven Labs für unseren interaktiven Voice Agent. 
        </p>
        <p>
          <strong>Anbieter:</strong> ElevenLabs, Inc., USA<br />
          <strong>Zweck:</strong> Bereitstellung eines KI-gestützten Sprachassistenten zur Demonstration unserer Voice Agent-Dienste
        </p>
        <p>
          <strong>Verarbeitete Daten:</strong>
        </p>
        <ul>
          <li>Audiodaten (Ihre Spracheingabe)</li>
          <li>IP-Adresse</li>
          <li>Geräteinformationen</li>
        </ul>
        <p className="bg-yellow-500/10 border border-yellow-500/30 p-4 rounded-lg">
          <strong>⚠️ Wichtiger Hinweis zur Datenübertragung in die USA:</strong><br />
          Bei Nutzung des Voice Agents werden Ihre Daten an Server von ElevenLabs in den USA übertragen. Die USA gelten als 
          Drittland ohne angemessenes Datenschutzniveau im Sinne der DSGVO. Es besteht das Risiko, dass US-Behörden auf Ihre 
          Daten zugreifen können, ohne dass Ihnen wirksame Rechtsbehelfe zur Verfügung stehen.
        </p>
        <p>
          <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. a DSGVO (Einwilligung via Cookie-Banner) i.V.m. Art. 49 Abs. 1 
          lit. a DSGVO (Einwilligung zur Drittlandübertragung)
        </p>
        <p>
          Datenschutzerklärung von Eleven Labs:{" "}
          <a href="https://elevenlabs.io/privacy-policy" target="_blank" rel="noopener noreferrer">
            https://elevenlabs.io/privacy-policy
          </a>
        </p>

        <h3>Datenübersicht nach Empfänger</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-muted/20">
                <th className="px-3 py-2 text-left">Empfänger</th>
                <th className="px-3 py-2 text-left">Zweck</th>
                <th className="px-3 py-2 text-left">Daten</th>
                <th className="px-3 py-2 text-left">Standort</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-3 py-2 border-b border-border">Replit, Inc.</td>
                <td className="px-3 py-2 border-b border-border">Hosting</td>
                <td className="px-3 py-2 border-b border-border">Alle Website-Daten</td>
                <td className="px-3 py-2 border-b border-border">USA</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border-b border-border">ElevenLabs, Inc.</td>
                <td className="px-3 py-2 border-b border-border">Voice Agent</td>
                <td className="px-3 py-2 border-b border-border">Audiodaten, IP</td>
                <td className="px-3 py-2 border-b border-border">USA</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border-b border-border">Neon (Datenbankhosting)</td>
                <td className="px-3 py-2 border-b border-border">Datenbank</td>
                <td className="px-3 py-2 border-b border-border">Forum-Daten, Einwilligungen</td>
                <td className="px-3 py-2 border-b border-border">USA</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>7. Ihre Rechte im Überblick</h2>
        <p>
          Nach der DSGVO stehen Ihnen folgende Rechte zu:
        </p>
        <ul>
          <li><strong>Auskunftsrecht (Art. 15 DSGVO):</strong> Sie können Auskunft über Ihre verarbeiteten Daten verlangen.</li>
          <li><strong>Berichtigungsrecht (Art. 16 DSGVO):</strong> Sie können die Berichtigung unrichtiger Daten verlangen.</li>
          <li><strong>Löschungsrecht (Art. 17 DSGVO):</strong> Sie können die Löschung Ihrer Daten verlangen, sofern keine 
            gesetzlichen Aufbewahrungspflichten entgegenstehen.</li>
          <li><strong>Einschränkungsrecht (Art. 18 DSGVO):</strong> Sie können die Einschränkung der Verarbeitung verlangen.</li>
          <li><strong>Datenübertragbarkeit (Art. 20 DSGVO):</strong> Sie können Ihre Daten in einem gängigen Format erhalten.</li>
          <li><strong>Widerspruchsrecht (Art. 21 DSGVO):</strong> Sie können der Verarbeitung widersprechen.</li>
          <li><strong>Widerrufsrecht:</strong> Sie können Ihre Einwilligung jederzeit widerrufen.</li>
          <li><strong>Beschwerderecht:</strong> Sie können sich bei einer Aufsichtsbehörde beschweren.</li>
        </ul>
        <p>
          Zur Ausübung Ihrer Rechte kontaktieren Sie uns bitte unter:{" "}
          <a href="mailto:Service-Kaiser@proton.me">Service-Kaiser@proton.me</a>
        </p>

        <h2>8. Online-Streitbeilegung</h2>
        <p>
          Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
          <a 
            href="https://ec.europa.eu/consumers/odr/" 
            target="_blank" 
            rel="noopener noreferrer"
            data-testid="link-eu-odr-datenschutz"
          >
            https://ec.europa.eu/consumers/odr/
          </a>
        </p>

        <h2>9. Aktualität und Änderung dieser Datenschutzerklärung</h2>
        <p>
          Diese Datenschutzerklärung ist aktuell gültig und hat den Stand Dezember 2025. Durch die Weiterentwicklung unserer 
          Website und Angebote darüber oder aufgrund geänderter gesetzlicher beziehungsweise behördlicher Vorgaben kann es 
          notwendig werden, diese Datenschutzerklärung zu ändern.
        </p>
        <p>
          Die jeweils aktuelle Datenschutzerklärung kann jederzeit auf dieser Website abgerufen werden.
        </p>

        <div className="mt-8 pt-6 border-t border-border">
          <p className="text-sm">
            Weitere rechtliche Informationen finden Sie in unserem{" "}
            <Link href="/impressum" data-testid="link-impressum-datenschutz">Impressum</Link> und 
            unseren <Link href="/agb" data-testid="link-agb-datenschutz">Allgemeinen Geschäftsbedingungen</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}

function PrivacyPolicyEN() {
  return (
    <div className="min-h-screen w-full pt-24 pb-20">
      <NodeBackground />
      <div className="max-w-3xl mx-auto px-4 relative z-10 prose prose-invert prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-a:text-primary">
        <h1 data-testid="text-privacy-title">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground">Last updated: December 2025</p>

        <h2>1. Privacy at a Glance</h2>
        
        <h3>General Information</h3>
        <p>
          The following notices provide a simple overview of what happens to your personal data when you visit this website. 
          Personal data is any data that can be used to personally identify you. Detailed information on data protection can 
          be found in our privacy policy below.
        </p>

        <h3>Data Collection on This Website</h3>
        <p>
          <strong>Who is responsible for data collection on this website?</strong><br />
          Data processing on this website is carried out by the website operator. You can find the contact details in the 
          section "Responsible Party" in this privacy policy.
        </p>
        <p>
          <strong>How do we collect your data?</strong><br />
          Your data is collected when you provide it to us. This could be data you enter in a contact form or during forum 
          registration. Other data is automatically collected or collected with your consent when you visit the website by 
          our IT systems. This is primarily technical data (e.g., internet browser, operating system, or time of page access).
        </p>
        <p>
          <strong>What do we use your data for?</strong><br />
          Some of the data is collected to ensure error-free provision of the website. Other data may be used to analyze 
          your user behavior. With your consent, we also use data for external services such as our Voice Agent.
        </p>
        <p>
          <strong>What rights do you have regarding your data?</strong><br />
          You have the right to receive free information about the origin, recipient, and purpose of your stored personal data 
          at any time. You also have the right to request the correction or deletion of this data. If you have given consent 
          to data processing, you can revoke this consent at any time for the future. You also have the right to request the 
          restriction of processing of your personal data under certain circumstances. You also have the right to lodge a 
          complaint with the competent supervisory authority.
        </p>

        <h2>2. Responsible Party</h2>
        <p>
          The responsible party for data processing on this website is:
        </p>
        <p>
          <strong>Kaiser-Service</strong><br />
          Sebastian Kaiser<br />
          23568 Lübeck<br />
          Germany
        </p>
        <p>
          Email: <a href="mailto:Service-Kaiser@proton.me">Service-Kaiser@proton.me</a>
        </p>
        <p>
          The responsible party is the natural or legal person who alone or jointly with others decides on the purposes and 
          means of processing personal data.
        </p>

        <h2>3. Hosting</h2>
        <p>
          We host our website content with the following provider:
        </p>
        <h3>Replit</h3>
        <p>
          The provider is Replit, Inc., 548 Market St Suite 71100, San Francisco, CA 94104, USA.
        </p>
        <p>
          <strong>Note on data transfer to the USA:</strong> Replit is a US provider. Data may therefore be transferred to 
          the USA. The USA is classified by the European Court of Justice as a country with an inadequate level of data 
          protection according to EU standards. There is a particular risk that your data may be processed by US authorities 
          for control and surveillance purposes.
        </p>
        <p>
          For details, please refer to Replit's privacy policy:{" "}
          <a href="https://replit.com/site/privacy" target="_blank" rel="noopener noreferrer">
            https://replit.com/site/privacy
          </a>
        </p>
        <p>
          The use of Replit is based on Art. 6(1)(f) GDPR. We have a legitimate interest in the most reliable presentation 
          of our website.
        </p>

        <h2>4. General Information and Mandatory Disclosures</h2>
        
        <h3>Data Protection</h3>
        <p>
          The operators of these pages take the protection of your personal data very seriously. We treat your personal data 
          confidentially and in accordance with the statutory data protection regulations and this privacy policy.
        </p>

        <h3>Storage Duration</h3>
        <p>
          Unless a more specific storage period has been specified within this privacy policy, your personal data will remain 
          with us until the purpose for data processing no longer applies.
        </p>
        <p>
          <strong>Overview of our storage periods:</strong>
        </p>
        <ul>
          <li>Server log files: 7 days</li>
          <li>Cookie consent data: 1 year</li>
          <li>Contact inquiries: 2 years after last contact</li>
          <li>Forum user data: Until account deletion</li>
          <li>Forum posts: Unlimited (public content)</li>
        </ul>

        <h3>Note on Data Transfer to the USA and Other Third Countries</h3>
        <p>
          We use tools from companies based in the USA or other third countries that are not secure under data protection law. 
          When these tools are active, your personal data may be transferred to and processed in these third countries. We 
          point out that no level of data protection comparable to the EU can be guaranteed in these countries.
        </p>

        <h3>Revocation of Your Consent to Data Processing</h3>
        <p>
          Many data processing operations are only possible with your express consent. You can revoke consent you have already 
          given at any time. The legality of the data processing carried out until the revocation remains unaffected by the 
          revocation.
        </p>

        <h3>Right to Object to Data Collection in Special Cases (Art. 21 GDPR)</h3>
        <p className="bg-muted/20 p-4 rounded-lg">
          <strong>IF DATA PROCESSING IS BASED ON ART. 6(1)(E) OR (F) GDPR, YOU HAVE THE RIGHT TO OBJECT TO THE PROCESSING 
          OF YOUR PERSONAL DATA AT ANY TIME FOR REASONS ARISING FROM YOUR PARTICULAR SITUATION. THE RESPECTIVE LEGAL BASIS 
          ON WHICH PROCESSING IS BASED CAN BE FOUND IN THIS PRIVACY POLICY. IF YOU OBJECT, WE WILL NO LONGER PROCESS YOUR 
          AFFECTED PERSONAL DATA UNLESS WE CAN DEMONSTRATE COMPELLING LEGITIMATE GROUNDS FOR PROCESSING.</strong>
        </p>

        <h3>Right to Lodge a Complaint with the Supervisory Authority</h3>
        <p>
          In the event of violations of the GDPR, data subjects have a right to lodge a complaint with a supervisory authority. 
          The competent supervisory authority for Schleswig-Holstein is:
        </p>
        <p>
          <strong>Unabhängiges Landeszentrum für Datenschutz Schleswig-Holstein (ULD)</strong><br />
          Holstenstraße 98<br />
          24103 Kiel, Germany<br />
          Tel.: +49 431 988-1200<br />
          Email: mail@datenschutzzentrum.de<br />
          Website:{" "}
          <a href="https://www.datenschutzzentrum.de" target="_blank" rel="noopener noreferrer">
            https://www.datenschutzzentrum.de
          </a>
        </p>

        <h3>Right to Data Portability</h3>
        <p>
          You have the right to have data that we process automatically based on your consent or in fulfillment of a contract 
          handed over to you or to a third party in a common, machine-readable format.
        </p>

        <h3>Information, Correction, and Deletion</h3>
        <p>
          Within the framework of the applicable legal provisions, you have the right at any time to free information about 
          your stored personal data, its origin and recipients, and the purpose of data processing, and if applicable, a 
          right to correction or deletion of this data. You can contact us at any time for this purpose and for further 
          questions on the subject of personal data.
        </p>

        <h2>5. Data Collection on This Website</h2>
        
        <h3>Cookies</h3>
        <p>
          Our website uses "cookies." Cookies are small data packets that do not cause any damage to your device. They are 
          stored either temporarily for the duration of a session (session cookies) or permanently (permanent cookies) on 
          your device.
        </p>

        <h4>Technically Necessary Cookies (No Consent Required)</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-muted/20">
                <th className="px-3 py-2 text-left">Cookie</th>
                <th className="px-3 py-2 text-left">Provider</th>
                <th className="px-3 py-2 text-left">Purpose</th>
                <th className="px-3 py-2 text-left">Duration</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-3 py-2 border-b border-border">connect.sid</td>
                <td className="px-3 py-2 border-b border-border">Kaiser-Service</td>
                <td className="px-3 py-2 border-b border-border">User session (login status)</td>
                <td className="px-3 py-2 border-b border-border">Session</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border-b border-border">cookie_consent</td>
                <td className="px-3 py-2 border-b border-border">Kaiser-Service</td>
                <td className="px-3 py-2 border-b border-border">Storage of cookie consent</td>
                <td className="px-3 py-2 border-b border-border">1 year</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          <strong>Legal basis:</strong> Art. 6(1)(f) GDPR (legitimate interest in providing website functions) in conjunction 
          with § 25(2)(2) TDDDG
        </p>

        <h4>Functional Cookies (Consent Required)</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-muted/20">
                <th className="px-3 py-2 text-left">Cookie</th>
                <th className="px-3 py-2 text-left">Provider</th>
                <th className="px-3 py-2 text-left">Purpose</th>
                <th className="px-3 py-2 text-left">Duration</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-3 py-2 border-b border-border">language</td>
                <td className="px-3 py-2 border-b border-border">Kaiser-Service</td>
                <td className="px-3 py-2 border-b border-border">Storage of language preference (DE/EN)</td>
                <td className="px-3 py-2 border-b border-border">1 year</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          <strong>Legal basis:</strong> Art. 6(1)(a) GDPR (consent) in conjunction with § 25(1) TDDDG
        </p>

        <h4>External Services Cookies (Consent Required)</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-muted/20">
                <th className="px-3 py-2 text-left">Cookie/Service</th>
                <th className="px-3 py-2 text-left">Provider</th>
                <th className="px-3 py-2 text-left">Purpose</th>
                <th className="px-3 py-2 text-left">Third Country</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-3 py-2 border-b border-border">Eleven Labs Voice Agent</td>
                <td className="px-3 py-2 border-b border-border">ElevenLabs, Inc., USA</td>
                <td className="px-3 py-2 border-b border-border">AI voice assistant for customer demos</td>
                <td className="px-3 py-2 border-b border-border">USA ⚠️</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          <strong>Third country transfer notice:</strong> When activating the Voice Agent, data is transferred to servers 
          in the USA. There is no adequacy decision pursuant to Art. 45 GDPR for the USA for data transfers to ElevenLabs. 
          You bear the risk that your data may be processed by US authorities for control and surveillance purposes without 
          effective legal remedies available to you.
        </p>
        <p>
          <strong>Legal basis:</strong> Art. 6(1)(a) GDPR (explicit consent) in conjunction with Art. 49(1)(a) GDPR 
          (consent to third country transfer)
        </p>

        <h4>Managing Cookie Consent</h4>
        <p>
          You can adjust your cookie settings at any time via the "Cookie Settings" button in the footer of this website 
          or revoke your consent.
        </p>

        <h3>Logging of Cookie Consent</h3>
        <p>
          To comply with the legal obligation to provide evidence, we log your cookie consent. The following data is stored:
        </p>
        <ul>
          <li>Time of consent</li>
          <li>Granted/refused categories</li>
          <li>Truncated IP address (last digit anonymized)</li>
          <li>User agent of the browser</li>
        </ul>
        <p>
          <strong>Storage duration:</strong> 3 years (according to GDPR proof obligation)<br />
          <strong>Legal basis:</strong> Art. 6(1)(c) GDPR (legal obligation) in conjunction with Art. 7(1) GDPR 
          (proof obligation)
        </p>

        <h3>Server Log Files</h3>
        <p>
          The provider of the pages automatically collects and stores information in so-called server log files, which your 
          browser automatically transmits to us. These are:
        </p>
        <ul>
          <li>Browser type and version</li>
          <li>Operating system used</li>
          <li>Referrer URL</li>
          <li>Hostname of the accessing computer</li>
          <li>Time of server request</li>
          <li>IP address</li>
        </ul>
        <p>
          <strong>Storage duration:</strong> 7 days<br />
          <strong>Legal basis:</strong> Art. 6(1)(f) GDPR (legitimate interests in security and optimization)
        </p>
        <p>
          This data is not merged with other data sources.
        </p>

        <h3>Contact Form</h3>
        <p>
          If you send us inquiries via the contact form, your details from the inquiry form, including the contact details you 
          provided there, will be stored by us for the purpose of processing the inquiry and in case of follow-up questions. 
          We do not share this data without your consent.
        </p>
        <p>
          <strong>Data collected:</strong> Name, email address, message, phone number (optional)<br />
          <strong>Storage duration:</strong> 2 years after last contact<br />
          <strong>Legal basis:</strong> Art. 6(1)(b) GDPR (contract performance / pre-contractual measures) or 
          Art. 6(1)(f) GDPR (legitimate interest)
        </p>

        <h3>Registration on This Website (Forum)</h3>
        <p>
          You can register on this website to use additional functions on the site (community forum). We use the data entered 
          for this purpose only for the use of the respective offer or service.
        </p>
        <p>
          <strong>Data collected:</strong> Username, email address, password (stored encrypted), display name (optional)
        </p>
        <p>
          The mandatory information requested during registration must be provided in full. Otherwise, we will reject the 
          registration.
        </p>
        <p>
          <strong>Storage duration:</strong> Until deletion of the user account<br />
          <strong>Legal basis:</strong> Art. 6(1)(b) GDPR (contract performance - user agreement for the forum)
        </p>
        <p>
          Forum posts remain after account deletion but are anonymized (username is removed).
        </p>

        <h2>6. External Services and Data Recipients</h2>
        
        <h3>Eleven Labs (Voice Agent)</h3>
        <p>
          On this website, we use Eleven Labs for our interactive Voice Agent.
        </p>
        <p>
          <strong>Provider:</strong> ElevenLabs, Inc., USA<br />
          <strong>Purpose:</strong> Providing an AI-powered voice assistant to demonstrate our Voice Agent services
        </p>
        <p>
          <strong>Processed data:</strong>
        </p>
        <ul>
          <li>Audio data (your voice input)</li>
          <li>IP address</li>
          <li>Device information</li>
        </ul>
        <p className="bg-yellow-500/10 border border-yellow-500/30 p-4 rounded-lg">
          <strong>⚠️ Important notice regarding data transfer to the USA:</strong><br />
          When using the Voice Agent, your data is transferred to ElevenLabs servers in the USA. The USA is considered a 
          third country without an adequate level of data protection within the meaning of the GDPR. There is a risk that 
          US authorities may access your data without effective legal remedies available to you.
        </p>
        <p>
          <strong>Legal basis:</strong> Art. 6(1)(a) GDPR (consent via cookie banner) in conjunction with Art. 49(1)(a) GDPR 
          (consent to third country transfer)
        </p>
        <p>
          Eleven Labs privacy policy:{" "}
          <a href="https://elevenlabs.io/privacy-policy" target="_blank" rel="noopener noreferrer">
            https://elevenlabs.io/privacy-policy
          </a>
        </p>

        <h3>Data Overview by Recipient</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-muted/20">
                <th className="px-3 py-2 text-left">Recipient</th>
                <th className="px-3 py-2 text-left">Purpose</th>
                <th className="px-3 py-2 text-left">Data</th>
                <th className="px-3 py-2 text-left">Location</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-3 py-2 border-b border-border">Replit, Inc.</td>
                <td className="px-3 py-2 border-b border-border">Hosting</td>
                <td className="px-3 py-2 border-b border-border">All website data</td>
                <td className="px-3 py-2 border-b border-border">USA</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border-b border-border">ElevenLabs, Inc.</td>
                <td className="px-3 py-2 border-b border-border">Voice Agent</td>
                <td className="px-3 py-2 border-b border-border">Audio data, IP</td>
                <td className="px-3 py-2 border-b border-border">USA</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border-b border-border">Neon (Database hosting)</td>
                <td className="px-3 py-2 border-b border-border">Database</td>
                <td className="px-3 py-2 border-b border-border">Forum data, consents</td>
                <td className="px-3 py-2 border-b border-border">USA</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>7. Your Rights at a Glance</h2>
        <p>
          Under the GDPR, you have the following rights:
        </p>
        <ul>
          <li><strong>Right to information (Art. 15 GDPR):</strong> You can request information about your processed data.</li>
          <li><strong>Right to rectification (Art. 16 GDPR):</strong> You can request the rectification of incorrect data.</li>
          <li><strong>Right to deletion (Art. 17 GDPR):</strong> You can request the deletion of your data, provided no legal 
            retention obligations apply.</li>
          <li><strong>Right to restriction (Art. 18 GDPR):</strong> You can request restriction of processing.</li>
          <li><strong>Right to data portability (Art. 20 GDPR):</strong> You can receive your data in a common format.</li>
          <li><strong>Right to object (Art. 21 GDPR):</strong> You can object to processing.</li>
          <li><strong>Right to withdrawal:</strong> You can withdraw your consent at any time.</li>
          <li><strong>Right to complain:</strong> You can lodge a complaint with a supervisory authority.</li>
        </ul>
        <p>
          To exercise your rights, please contact us at:{" "}
          <a href="mailto:Service-Kaiser@proton.me">Service-Kaiser@proton.me</a>
        </p>

        <h2>8. Online Dispute Resolution</h2>
        <p>
          The European Commission provides a platform for online dispute resolution (ODR):{" "}
          <a 
            href="https://ec.europa.eu/consumers/odr/" 
            target="_blank" 
            rel="noopener noreferrer"
            data-testid="link-eu-odr-datenschutz"
          >
            https://ec.europa.eu/consumers/odr/
          </a>
        </p>

        <h2>9. Currency and Amendment of This Privacy Policy</h2>
        <p>
          This privacy policy is currently valid as of December 2025. Due to the further development of our website and offers 
          or due to changed legal or official requirements, it may become necessary to change this privacy policy.
        </p>
        <p>
          The current privacy policy can be accessed at any time on this website.
        </p>

        <div className="mt-8 pt-6 border-t border-border">
          <p className="text-sm">
            You can find further legal information in our{" "}
            <Link href="/impressum" data-testid="link-impressum-datenschutz">Legal Notice</Link> and 
            our <Link href="/agb" data-testid="link-agb-datenschutz">General Terms and Conditions</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
