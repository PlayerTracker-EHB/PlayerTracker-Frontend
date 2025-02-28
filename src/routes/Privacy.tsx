import { createFileRoute } from "@tanstack/react-router";
import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Clock,
  Eye,
  FileText,
  Globe,
  Server,
  Shield,
  Lock,
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

// Création de la route Privacy
export const Route = createFileRoute("/Privacy")({
  component: RouteComponent,
});

// 1. Définissez le type pour vos sections
type PrivacySections = {
  dataCollection: boolean;
  dataUsage: boolean;
  dataSecurity: boolean;
  thirdParty: boolean;
  userRights: boolean;
  cookies: boolean;
  changes: boolean;
};

// 2. Implémentez votre composant
function RouteComponent() {
  const navigate = useNavigate();
  const [expandedSections, setExpandedSections] = useState<PrivacySections>({
    dataCollection: true,
    dataUsage: false,
    dataSecurity: false,
    thirdParty: false,
    userRights: false,
    cookies: false,
    changes: false,
  });

  // 4. Typage de la fonction toggleSection
  const toggleSection = (section: keyof PrivacySections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Header */}
      <header className="bg-white shadow-sm py-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Conteneur du logo et bouton retour alignés à gauche */}
          <div className="flex items-center">
            {/* Bouton retour à gauche */}
            <button
              onClick={() => navigate({ to: "/" })}
              className="flex items-center text-gray-600 hover:text-gray-900 transition mr-3"
              aria-label="Retour à l'accueil"
            >
              <ArrowLeft className="h-6 w-6" />
            </button>

            {/* Logo et titre PlayerTracker */}
            <img
              src="/logo.png"
              alt="Logo PlayerTracker"
              className="h-8 w-8 mr-3"
            />
            <h1 className="text-2xl font-bold text-gray-900">PlayerTracker</h1>
          </div>

          {/* Date de mise à jour alignée à droite */}
          <div className="text-sm text-gray-500">
            Last Updated: February 28, 2025
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We value your privacy and are committed to protecting your personal
            data. This privacy policy explains how we collect, use, and
            safeguard your information.
          </p>
        </div>

        {/* Table of Contents */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">Table of Contents</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <li className="flex items-center">
              <span className="w-6 h-6 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full mr-2 text-sm">
                1
              </span>
              <a
                href="#data-collection"
                className="text-blue-600 hover:underline"
              >
                Data Collection
              </a>
            </li>
            <li className="flex items-center">
              <span className="w-6 h-6 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full mr-2 text-sm">
                2
              </span>
              <a href="#data-usage" className="text-blue-600 hover:underline">
                How We Use Your Data
              </a>
            </li>
            <li className="flex items-center">
              <span className="w-6 h-6 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full mr-2 text-sm">
                3
              </span>
              <a
                href="#data-security"
                className="text-blue-600 hover:underline"
              >
                Data Security
              </a>
            </li>
            <li className="flex items-center">
              <span className="w-6 h-6 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full mr-2 text-sm">
                4
              </span>
              <a href="#third-party" className="text-blue-600 hover:underline">
                Third-Party Sharing
              </a>
            </li>
            <li className="flex items-center">
              <span className="w-6 h-6 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full mr-2 text-sm">
                5
              </span>
              <a href="#user-rights" className="text-blue-600 hover:underline">
                Your Rights
              </a>
            </li>
            <li className="flex items-center">
              <span className="w-6 h-6 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full mr-2 text-sm">
                6
              </span>
              <a href="#cookies" className="text-blue-600 hover:underline">
                Cookies Policy
              </a>
            </li>
            <li className="flex items-center">
              <span className="w-6 h-6 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full mr-2 text-sm">
                7
              </span>
              <a href="#changes" className="text-blue-600 hover:underline">
                Changes to This Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Policy Sections */}
        <div className="space-y-6">
          {/* Data Collection Section */}
          <section
            id="data-collection"
            className="bg-white rounded-lg border border-gray-200 overflow-hidden transition-all duration-300"
          >
            <button
              onClick={() => toggleSection("dataCollection")}
              className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center">
                <Eye className="h-5 w-5 text-blue-600 mr-3" />
                <h3 className="text-xl font-semibold">1. Data Collection</h3>
              </div>
              {expandedSections.dataCollection ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </button>

            {expandedSections.dataCollection && (
              <div className="px-6 py-4 animate-fadeIn">
                <p className="mb-4">
                  We collect several types of information from and about users
                  of our website, including:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>
                    Personal identifiers such as name, email address, phone
                    number
                  </li>
                  <li>Account credentials including username and password</li>
                  <li>Profile information such as preferences and interests</li>
                  <li>
                    Usage data including browsing history, search queries, and
                    interaction with our services
                  </li>
                  <li>
                    Device information such as IP address, browser type, and
                    operating system
                  </li>
                </ul>
                <p>
                  We collect this information directly from you when you provide
                  it to us, automatically as you navigate through the site, and
                  from third parties such as business partners and analytics
                  providers.
                </p>
              </div>
            )}
          </section>

          {/* Data Usage Section */}
          <section
            id="data-usage"
            className="bg-white rounded-lg border border-gray-200 overflow-hidden transition-all duration-300"
          >
            <button
              onClick={() => toggleSection("dataUsage")}
              className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center">
                <Server className="h-5 w-5 text-blue-600 mr-3" />
                <h3 className="text-xl font-semibold">
                  2. How We Use Your Data
                </h3>
              </div>
              {expandedSections.dataUsage ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </button>

            {expandedSections.dataUsage && (
              <div className="px-6 py-4 animate-fadeIn">
                <p className="mb-4">
                  We use the information we collect about you for various
                  purposes, including:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>Providing, maintaining, and improving our services</li>
                  <li>
                    Processing transactions and sending related information
                  </li>
                  <li>
                    Sending administrative messages, such as confirmations,
                    updates, and security alerts
                  </li>
                  <li>
                    Personalizing your experience and delivering content
                    tailored to your interests
                  </li>
                  <li>
                    Analyzing usage patterns to enhance our website
                    functionality
                  </li>
                  <li>
                    Detecting, preventing, and addressing technical issues or
                    fraudulent activities
                  </li>
                  <li>
                    Complying with legal obligations and enforcing our terms of
                    service
                  </li>
                </ul>
                <p>
                  We process your personal data only for the purposes described
                  above and in accordance with applicable data protection laws.
                </p>
              </div>
            )}
          </section>

          {/* Data Security Section */}
          <section
            id="data-security"
            className="bg-white rounded-lg border border-gray-200 overflow-hidden transition-all duration-300"
          >
            <button
              onClick={() => toggleSection("dataSecurity")}
              className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center">
                <Lock className="h-5 w-5 text-blue-600 mr-3" />
                <h3 className="text-xl font-semibold">3. Data Security</h3>
              </div>
              {expandedSections.dataSecurity ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </button>

            {expandedSections.dataSecurity && (
              <div className="px-6 py-4 animate-fadeIn">
                <p className="mb-4">
                  We implement appropriate technical and organizational measures
                  to protect your personal data against unauthorized or unlawful
                  processing, accidental loss, destruction, or damage. These
                  measures include:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>
                    Encryption of sensitive data both in transit and at rest
                  </li>
                  <li>Regular security assessments and penetration testing</li>
                  <li>Access controls and authentication mechanisms</li>
                  <li>Regular backups and disaster recovery procedures</li>
                  <li>
                    Employee training on data protection and security practices
                  </li>
                </ul>
                <p className="mb-4">
                  While we strive to use commercially acceptable means to
                  protect your personal data, no method of transmission over the
                  Internet or method of electronic storage is 100% secure. We
                  cannot guarantee absolute security but continuously work to
                  enhance our security measures.
                </p>
                <p>
                  In the event of a data breach that may compromise your
                  personal information, we will notify you and the relevant
                  authorities as required by applicable law.
                </p>
              </div>
            )}
          </section>

          {/* Third-Party Sharing Section */}
          <section
            id="third-party"
            className="bg-white rounded-lg border border-gray-200 overflow-hidden transition-all duration-300"
          >
            <button
              onClick={() => toggleSection("thirdParty")}
              className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center">
                <Globe className="h-5 w-5 text-blue-600 mr-3" />
                <h3 className="text-xl font-semibold">
                  4. Third-Party Sharing
                </h3>
              </div>
              {expandedSections.thirdParty ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </button>

            {expandedSections.thirdParty && (
              <div className="px-6 py-4 animate-fadeIn">
                <p className="mb-4">
                  We may share your personal information with the following
                  categories of third parties:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>
                    Service providers who perform functions on our behalf (e.g.,
                    hosting, analytics)
                  </li>
                  <li>
                    Business partners with whom we jointly offer products or
                    services
                  </li>
                  <li>Affiliated companies within our corporate group</li>
                  <li>
                    Legal authorities when required by law or to protect our
                    rights
                  </li>
                  <li>
                    Potential buyers in the event of a merger, acquisition, or
                    sale of assets
                  </li>
                </ul>
                <p className="mb-4">
                  We require all third parties to respect the security of your
                  personal data and to treat it in accordance with applicable
                  laws. We do not allow our third-party service providers to use
                  your personal data for their own purposes and only permit them
                  to process your personal data for specified purposes and in
                  accordance with our instructions.
                </p>
                <p>
                  We do not sell your personal information to third parties for
                  marketing purposes.
                </p>
              </div>
            )}
          </section>

          {/* User Rights Section */}
          <section
            id="user-rights"
            className="bg-white rounded-lg border border-gray-200 overflow-hidden transition-all duration-300"
          >
            <button
              onClick={() => toggleSection("userRights")}
              className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center">
                <FileText className="h-5 w-5 text-blue-600 mr-3" />
                <h3 className="text-xl font-semibold">5. Your Rights</h3>
              </div>
              {expandedSections.userRights ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </button>

            {expandedSections.userRights && (
              <div className="px-6 py-4 animate-fadeIn">
                <p className="mb-4">
                  Depending on your location, you may have certain rights
                  regarding your personal data, including:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>
                    <strong>Access:</strong> You can request copies of your
                    personal data that we hold.
                  </li>
                  <li>
                    <strong>Rectification:</strong> You can ask us to correct
                    inaccurate personal data or complete incomplete data.
                  </li>
                  <li>
                    <strong>Erasure:</strong> You can request that we delete
                    your personal data in certain circumstances.
                  </li>
                  <li>
                    <strong>Restriction:</strong> You can ask us to restrict the
                    processing of your personal data.
                  </li>
                  <li>
                    <strong>Data portability:</strong> You can request the
                    transfer of your personal data to you or a third party.
                  </li>
                  <li>
                    <strong>Objection:</strong> You can object to our processing
                    of your personal data in certain circumstances.
                  </li>
                </ul>
                <p className="mb-4">
                  To exercise any of these rights, please contact us using the
                  contact information provided at the end of this policy. We may
                  need to verify your identity before responding to your
                  request.
                </p>
                <p>
                  If you believe that our processing of your personal data
                  infringes data protection laws, you have the right to lodge a
                  complaint with a supervisory authority.
                </p>
              </div>
            )}
          </section>

          {/* Cookies Section */}
          <section
            id="cookies"
            className="bg-white rounded-lg border border-gray-200 overflow-hidden transition-all duration-300"
          >
            <button
              onClick={() => toggleSection("cookies")}
              className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-blue-600 mr-3" />
                <h3 className="text-xl font-semibold">6. Cookies Policy</h3>
              </div>
              {expandedSections.cookies ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </button>

            {expandedSections.cookies && (
              <div className="px-6 py-4 animate-fadeIn">
                <p className="mb-4">
                  Our website uses cookies and similar technologies to
                  distinguish you from other users and enhance your experience.
                  A cookie is a small file of letters and numbers that we store
                  on your browser or the hard drive of your device.
                </p>
                <p className="mb-4">We use the following types of cookies:</p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>
                    <strong>Essential cookies:</strong> Required for the
                    operation of our website. They enable basic functions like
                    page navigation and access to secure areas.
                  </li>
                  <li>
                    <strong>Analytical/performance cookies:</strong> Allow us to
                    recognize and count the number of visitors and see how
                    visitors move around our website. This helps us improve the
                    way our website works.
                  </li>
                  <li>
                    <strong>Functionality cookies:</strong> Used to recognize
                    you when you return to our website. This enables us to
                    personalize our content for you and remember your
                    preferences.
                  </li>
                  <li>
                    <strong>Targeting cookies:</strong> Record your visit to our
                    website, the pages you have visited, and the links you have
                    followed. We use this information to make our website and
                    the advertising displayed on it more relevant to your
                    interests.
                  </li>
                </ul>
                <p className="mb-4">
                  You can set your browser to refuse all or some browser
                  cookies, or to alert you when websites set or access cookies.
                  If you disable or refuse cookies, please note that some parts
                  of this website may become inaccessible or not function
                  properly.
                </p>
                <p>
                  For more information about the cookies we use, please see our
                  dedicated Cookies Policy.
                </p>
              </div>
            )}
          </section>

          {/* Changes Section */}
          <section
            id="changes"
            className="bg-white rounded-lg border border-gray-200 overflow-hidden transition-all duration-300"
          >
            <button
              onClick={() => toggleSection("changes")}
              className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center">
                <Shield className="h-5 w-5 text-blue-600 mr-3" />
                <h3 className="text-xl font-semibold">
                  7. Changes to This Policy
                </h3>
              </div>
              {expandedSections.changes ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </button>

            {expandedSections.changes && (
              <div className="px-6 py-4 animate-fadeIn">
                <p className="mb-4">
                  We may update our privacy policy from time to time. We will
                  notify you of any changes by posting the new privacy policy on
                  this page and updating the "Last Updated" date at the top of
                  this policy.
                </p>
                <p className="mb-4">
                  We will provide more prominent notice of material changes to
                  this policy, such as by sending you an email notification. We
                  encourage you to review this privacy policy periodically for
                  any changes.
                </p>
                <p>
                  Your continued use of our website after we post changes to
                  this policy means that you accept and agree to the updated
                  policy.
                </p>
              </div>
            )}
          </section>
        </div>

        {/* Contact Information */}
        <div className="mt-12 bg-gray-50 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
          <p className="mb-4">
            If you have any questions about these Terms and Conditions, please
            contact us at:
          </p>
          <div className="bg-white p-4 rounded border border-gray-200">
            <p className="mb-1">
              <strong>PlayerTracker, Inc.</strong>
            </p>
            <p className="mb-1">123 Nijverheidskaai, Anderlecht</p>
            <p className="mb-1">Anderlecht, BRU 1070</p>
            <p className="mb-1">Belgium</p>
            <p className="mb-1">Email: contact@playertracker.com</p>
            <p>Phone: +32 490 22 19 13</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-8 mt-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-500 mb-2">
            © 2025 PlayerTracker, Inc. All rights reserved.
          </p>
          <div className="flex justify-center space-x-4 text-sm">
            <a href="#" className="text-blue-600 hover:underline">
              Terms of Conditions
            </a>
            <a href="#" className="text-blue-600 hover:underline">
              Privacy Policy
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
