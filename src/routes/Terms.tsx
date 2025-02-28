import { createFileRoute } from "@tanstack/react-router";
import React, { useState } from "react";
import {
  AlertTriangle,
  BookOpen,
  Briefcase,
  ChevronDown,
  ChevronUp,
  Clock,
  FileText,
  Globe,
  Scale,
  Shield,
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

// 1. Créez la route "/Terms" avec TanStack Router
export const Route = createFileRoute("/Terms")({
  component: RouteComponent,
});

// 2. Définissez le type de vos sections
type TermsSections = {
  acceptance: boolean;
  accountTerms: boolean;
  intellectualProperty: boolean;
  userContent: boolean;
  prohibitedUses: boolean;
  termination: boolean;
  disclaimers: boolean;
  limitation: boolean;
  governing: boolean;
  changes: boolean;
};

function RouteComponent() {
  const navigate = useNavigate();
  const [expandedSections, setExpandedSections] = useState<TermsSections>({
    acceptance: true,
    accountTerms: false,
    intellectualProperty: false,
    userContent: false,
    prohibitedUses: false,
    termination: false,
    disclaimers: false,
    limitation: false,
    governing: false,
    changes: false,
  });

  // 4. Typage de la fonction toggleSection
  const toggleSection = (section: keyof TermsSections) => {
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
            Terms and Conditions
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Please read these terms and conditions carefully before using our
            service. By accessing or using our service, you agree to be bound by
            these terms.
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
              <a href="#acceptance" className="text-blue-600 hover:underline">
                Acceptance of Terms
              </a>
            </li>
            <li className="flex items-center">
              <span className="w-6 h-6 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full mr-2 text-sm">
                2
              </span>
              <a
                href="#account-terms"
                className="text-blue-600 hover:underline"
              >
                Account Terms
              </a>
            </li>
            <li className="flex items-center">
              <span className="w-6 h-6 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full mr-2 text-sm">
                3
              </span>
              <a
                href="#intellectual-property"
                className="text-blue-600 hover:underline"
              >
                Intellectual Property
              </a>
            </li>
            <li className="flex items-center">
              <span className="w-6 h-6 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full mr-2 text-sm">
                4
              </span>
              <a href="#user-content" className="text-blue-600 hover:underline">
                User Content
              </a>
            </li>
            <li className="flex items-center">
              <span className="w-6 h-6 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full mr-2 text-sm">
                5
              </span>
              <a
                href="#prohibited-uses"
                className="text-blue-600 hover:underline"
              >
                Prohibited Uses
              </a>
            </li>
            <li className="flex items-center">
              <span className="w-6 h-6 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full mr-2 text-sm">
                6
              </span>
              <a href="#termination" className="text-blue-600 hover:underline">
                Termination
              </a>
            </li>
            <li className="flex items-center">
              <span className="w-6 h-6 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full mr-2 text-sm">
                7
              </span>
              <a href="#disclaimers" className="text-blue-600 hover:underline">
                Disclaimers
              </a>
            </li>
            <li className="flex items-center">
              <span className="w-6 h-6 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full mr-2 text-sm">
                8
              </span>
              <a href="#limitation" className="text-blue-600 hover:underline">
                Limitation of Liability
              </a>
            </li>
            <li className="flex items-center">
              <span className="w-6 h-6 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full mr-2 text-sm">
                9
              </span>
              <a href="#governing" className="text-blue-600 hover:underline">
                Governing Law
              </a>
            </li>
            <li className="flex items-center">
              <span className="w-6 h-6 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full mr-2 text-sm">
                10
              </span>
              <a href="#changes" className="text-blue-600 hover:underline">
                Changes to Terms
              </a>
            </li>
          </ul>
        </div>

        {/* Terms Sections */}
        <div className="space-y-6">
          {/* Acceptance Section */}
          <section
            id="acceptance"
            className="bg-white rounded-lg border border-gray-200 overflow-hidden transition-all duration-300"
          >
            <button
              onClick={() => toggleSection("acceptance")}
              className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center">
                <FileText className="h-5 w-5 text-blue-600 mr-3" />
                <h3 className="text-xl font-semibold">
                  1. Acceptance of Terms
                </h3>
              </div>
              {expandedSections.acceptance ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </button>

            {expandedSections.acceptance && (
              <div className="px-6 py-4 animate-fadeIn">
                <p className="mb-4">
                  By accessing or using our website, mobile applications, or any
                  other products or services offered by PlayerTracker
                  (collectively, the "Services"), you agree to be bound by these
                  Terms and Conditions and all applicable laws and regulations.
                  If you do not agree with any of these terms, you are
                  prohibited from using or accessing the Services.
                </p>
                <p className="mb-4">
                  These Terms and Conditions apply to all registered users,
                  including data analysts, coaches, and technical staff of
                  futsal clubs. By accessing or using any part of the Services,
                  you agree to be bound by these Terms and Conditions. If you do
                  not agree to all the terms and conditions of this agreement,
                  then you may not access the Services.
                </p>
                <p>
                  Your access to and use of the Services is conditioned on your
                  acceptance of and compliance with these Terms. These Terms
                  apply to all registered users. By accessing or using the
                  Services, you agree to be bound by these Terms.
                </p>
              </div>
            )}
          </section>

          {/* Account Terms Section */}
          <section
            id="account-terms"
            className="bg-white rounded-lg border border-gray-200 overflow-hidden transition-all duration-300"
          >
            <button
              onClick={() => toggleSection("accountTerms")}
              className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center">
                <Briefcase className="h-5 w-5 text-blue-600 mr-3" />
                <h3 className="text-xl font-semibold">2. Account Terms</h3>
              </div>
              {expandedSections.accountTerms ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </button>

            {expandedSections.accountTerms && (
              <div className="px-6 py-4 animate-fadeIn">
                <p className="mb-4">
                  To access certain features of the Services, you must register
                  for an account. When you register for an account, you agree to
                  the following terms:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>
                    You must provide accurate, current, and complete information
                    during the registration process.
                  </li>
                  <li>
                    You are responsible for maintaining the confidentiality of
                    your account credentials, including your password, which is
                    securely hashed.
                  </li>
                  <li>
                    You are responsible for all activities that occur under your
                    account.
                  </li>
                  <li>
                    You must notify us immediately of any unauthorized use of
                    your account or any other breach of security.
                  </li>
                  <li>
                    You may not use as a username the name of another person or
                    entity that is not lawfully available for use, or a name or
                    trademark that is subject to any rights of another person or
                    entity without appropriate authorization.
                  </li>
                  <li>
                    You may not sell, trade, or transfer your account to another
                    party.
                  </li>
                </ul>
                <p className="mb-4">
                  We reserve the right to terminate or suspend your account
                  immediately, without prior notice or liability, for any reason
                  whatsoever, including, without limitation, if you breach these
                  Terms and Conditions.
                </p>
                <p>
                  Upon termination, your right to use the Services will
                  immediately cease. If you wish to terminate your account, you
                  may simply discontinue using the Services or contact us to
                  request account deletion.
                </p>
              </div>
            )}
          </section>

          {/* Intellectual Property Section */}
          <section
            id="intellectual-property"
            className="bg-white rounded-lg border border-gray-200 overflow-hidden transition-all duration-300"
          >
            <button
              onClick={() => toggleSection("intellectualProperty")}
              className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center">
                <BookOpen className="h-5 w-5 text-blue-600 mr-3" />
                <h3 className="text-xl font-semibold">
                  3. Intellectual Property
                </h3>
              </div>
              {expandedSections.intellectualProperty ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </button>

            {expandedSections.intellectualProperty && (
              <div className="px-6 py-4 animate-fadeIn">
                <p className="mb-4">
                  The Services and their original content, features, and
                  functionality are and will remain the exclusive property of
                  PlayerTracker and its licensors. The Services are protected by
                  copyright, trademark, and other laws of both the United States
                  and foreign countries. Our trademarks and trade dress may not
                  be used in connection with any product or service without the
                  prior written consent of PlayerTracker.
                </p>
                <p className="mb-4">
                  All content included on the Services, such as text, graphics,
                  logos, images, as well as the compilation thereof, and any
                  software used on the Services, is the property of
                  PlayerTracker or its suppliers and protected by copyright and
                  other laws. You agree not to reproduce, duplicate, copy, sell,
                  resell, or exploit any portion of the Services without express
                  written permission from us.
                </p>
                <p className="mb-4">
                  By using the Services, you acknowledge and agree that:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>
                    The PlayerTracker name, logo, and all related names, logos,
                    product and service names, designs, and slogans are
                    trademarks of PlayerTracker or its affiliates or licensors.
                  </li>
                  <li>
                    You must not use such marks without the prior written
                    permission of PlayerTracker.
                  </li>
                  <li>
                    All other names, logos, product and service names, designs,
                    and slogans on the Services are the trademarks of their
                    respective owners.
                  </li>
                </ul>
                <p>
                  Nothing in these Terms and Conditions should be construed as
                  granting, by implication, estoppel, or otherwise, any license
                  or right to use any of PlayerTracker's intellectual property
                  without our express written permission.
                </p>
              </div>
            )}
          </section>

          {/* User Content Section */}
          <section
            id="user-content"
            className="bg-white rounded-lg border border-gray-200 overflow-hidden transition-all duration-300"
          >
            <button
              onClick={() => toggleSection("userContent")}
              className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center">
                <FileText className="h-5 w-5 text-blue-600 mr-3" />
                <h3 className="text-xl font-semibold">4. User Content</h3>
              </div>
              {expandedSections.userContent ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </button>

            {expandedSections.userContent && (
              <div className="px-6 py-4 animate-fadeIn">
                <p className="mb-4">
                  Our Services may allow you to post, link, store, share, and
                  otherwise make available certain information, text, graphics,
                  videos, or other material ("User Content"). By providing User
                  Content to the Services, you grant us a worldwide,
                  non-exclusive, royalty-free, sublicensable, and transferable
                  license to use, reproduce, distribute, prepare derivative
                  works of, display, and perform the User Content in connection
                  with the Services and PlayerTracker's business, including
                  without limitation for promoting and redistributing part or
                  all of the Services.
                </p>
                <p className="mb-4">
                  You are solely responsible for the User Content that you post,
                  upload, link to, or otherwise make available via the Services.
                  You represent and warrant that:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>
                    You own the User Content posted by you or otherwise have the
                    right to grant the rights and licenses set forth in these
                    Terms.
                  </li>
                  <li>
                    The posting and use of your User Content does not violate,
                    misappropriate, or infringe on the rights of any third
                    party, including, without limitation, privacy rights,
                    publicity rights, copyrights, trademark, and/or other
                    intellectual property rights.
                  </li>
                  <li>
                    Your User Content does not violate any applicable law,
                    regulation, or rule.
                  </li>
                  <li>
                    Your User Content is not false, misleading, or deceptive.
                  </li>
                </ul>
                <p className="mb-4">
                  We reserve the right to remove any User Content from the
                  Services at any time, for any reason (including, but not
                  limited to, if someone alleges you contributed that content in
                  violation of these Terms), in our sole discretion, and without
                  notice.
                </p>
                <p>
                  We have no obligation to monitor User Content, but we may
                  review User Content to determine whether it violates these
                  Terms. We are not responsible for the accuracy, completeness,
                  appropriateness, or legality of User Content or any other
                  information you may access using the Services.
                </p>
              </div>
            )}
          </section>

          {/* Prohibited Uses Section */}
          <section
            id="prohibited-uses"
            className="bg-white rounded-lg border border-gray-200 overflow-hidden transition-all duration-300"
          >
            <button
              onClick={() => toggleSection("prohibitedUses")}
              className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center">
                <AlertTriangle className="h-5 w-5 text-blue-600 mr-3" />
                <h3 className="text-xl font-semibold">5. Prohibited Uses</h3>
              </div>
              {expandedSections.prohibitedUses ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </button>

            {expandedSections.prohibitedUses && (
              <div className="px-6 py-4 animate-fadeIn">
                <p className="mb-4">You agree not to use the Services:</p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>
                    In any way that violates any applicable federal, state,
                    local, or international law or regulation.
                  </li>
                  <li>
                    For the purpose of exploiting, harming, or attempting to
                    exploit or harm minors in any way.
                  </li>
                  <li>
                    To transmit, or procure the sending of, any advertising or
                    promotional material, including any "junk mail," "chain
                    letter," "spam," or any other similar solicitation.
                  </li>
                  <li>
                    To impersonate or attempt to impersonate PlayerTracker, a
                    PlayerTracker employee, another user, or any other person or
                    entity.
                  </li>
                  <li>
                    To engage in any other conduct that restricts or inhibits
                    anyone's use or enjoyment of the Services, or which, as
                    determined by us, may harm PlayerTracker or users of the
                    Services or expose them to liability.
                  </li>
                </ul>
                <p className="mb-4">Additionally, you agree not to:</p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>
                    Use the Services in any manner that could disable,
                    overburden, damage, or impair the Services or interfere with
                    any other party's use of the Services.
                  </li>
                  <li>
                    Use any robot, spider, or other automatic device, process,
                    or means to access the Services for any purpose, including
                    monitoring or copying any of the material on the Services.
                  </li>
                  <li>
                    Use any manual process to monitor or copy any of the
                    material on the Services or for any other unauthorized
                    purpose without our prior written consent.
                  </li>
                  <li>
                    Use any device, software, or routine that interferes with
                    the proper working of the Services.
                  </li>
                  <li>
                    Introduce any viruses, trojan horses, worms, logic bombs, or
                    other material which is malicious or technologically
                    harmful.
                  </li>
                  <li>
                    Attempt to gain unauthorized access to, interfere with,
                    damage, or disrupt any parts of the Services, the server on
                    which the Services are stored, or any server, computer, or
                    database connected to the Services.
                  </li>
                  <li>
                    Attack the Services via a denial-of-service attack or a
                    distributed denial-of-service attack.
                  </li>
                  <li>
                    Otherwise attempt to interfere with the proper working of
                    the Services.
                  </li>
                </ul>
                <p>
                  We reserve the right to terminate your use of the Services for
                  violating any of the prohibited uses.
                </p>
              </div>
            )}
          </section>

          {/* Termination Section */}
          <section
            id="termination"
            className="bg-white rounded-lg border border-gray-200 overflow-hidden transition-all duration-300"
          >
            <button
              onClick={() => toggleSection("termination")}
              className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-blue-600 mr-3" />
                <h3 className="text-xl font-semibold">6. Termination</h3>
              </div>
              {expandedSections.termination ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </button>

            {expandedSections.termination && (
              <div className="px-6 py-4 animate-fadeIn">
                <p className="mb-4">
                  We may terminate or suspend your account and bar access to the
                  Services immediately, without prior notice or liability, under
                  our sole discretion, for any reason whatsoever and without
                  limitation, including but not limited to a breach of the
                  Terms.
                </p>
                <p className="mb-4">
                  If you wish to terminate your account, you may simply
                  discontinue using the Services, or notify us that you wish to
                  delete your account.
                </p>
                <p className="mb-4">
                  All provisions of the Terms which by their nature should
                  survive termination shall survive termination, including,
                  without limitation, ownership provisions, warranty
                  disclaimers, indemnity, and limitations of liability.
                </p>
                <p>
                  Upon termination, your right to use the Services will
                  immediately cease. If you wish to terminate your account, you
                  may simply discontinue using the Services or contact us to
                  request account deletion.
                </p>
              </div>
            )}
          </section>

          {/* Disclaimers Section */}
          <section
            id="disclaimers"
            className="bg-white rounded-lg border border-gray-200 overflow-hidden transition-all duration-300"
          >
            <button
              onClick={() => toggleSection("disclaimers")}
              className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center">
                <AlertTriangle className="h-5 w-5 text-blue-600 mr-3" />
                <h3 className="text-xl font-semibold">7. Disclaimers</h3>
              </div>
              {expandedSections.disclaimers ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </button>

            {expandedSections.disclaimers && (
              <div className="px-6 py-4 animate-fadeIn">
                <p className="mb-4">
                  YOUR USE OF THE SERVICES IS AT YOUR SOLE RISK. THE SERVICES
                  ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS.
                  PLAYERTRACKER EXPRESSLY DISCLAIMS ALL WARRANTIES OF ANY KIND,
                  WHETHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO THE
                  IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
                  PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
                </p>
                <p className="mb-4">
                  PLAYERTRACKER MAKES NO WARRANTY THAT (i) THE SERVICES WILL
                  MEET YOUR REQUIREMENTS, (ii) THE SERVICES WILL BE
                  UNINTERRUPTED, TIMELY, SECURE, OR ERROR-FREE, (iii) THE
                  RESULTS THAT MAY BE OBTAINED FROM THE USE OF THE SERVICES WILL
                  BE ACCURATE OR RELIABLE, OR (iv) THE QUALITY OF ANY PRODUCTS,
                  SERVICES, INFORMATION, OR OTHER MATERIAL PURCHASED OR OBTAINED
                  BY YOU THROUGH THE SERVICES WILL MEET YOUR EXPECTATIONS.
                </p>
                <p>
                  NO ADVICE OR INFORMATION, WHETHER ORAL OR WRITTEN, OBTAINED BY
                  YOU FROM PLAYERTRACKER OR THROUGH OR FROM THE SERVICES SHALL
                  CREATE ANY WARRANTY NOT EXPRESSLY STATED IN THE TERMS.
                </p>
              </div>
            )}
          </section>

          {/* Limitation of Liability Section */}
          <section
            id="limitation"
            className="bg-white rounded-lg border border-gray-200 overflow-hidden transition-all duration-300"
          >
            <button
              onClick={() => toggleSection("limitation")}
              className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center">
                <Scale className="h-5 w-5 text-blue-600 mr-3" />
                <h3 className="text-xl font-semibold">
                  8. Limitation of Liability
                </h3>
              </div>
              {expandedSections.limitation ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </button>

            {expandedSections.limitation && (
              <div className="px-6 py-4 animate-fadeIn">
                <p className="mb-4">
                  IN NO EVENT SHALL PLAYERTRACKER, ITS OFFICERS, DIRECTORS,
                  EMPLOYEES, OR AGENTS, BE LIABLE TO YOU FOR ANY DIRECT,
                  INDIRECT, INCIDENTAL, SPECIAL, PUNITIVE, OR CONSEQUENTIAL
                  DAMAGES WHATSOEVER RESULTING FROM ANY (i) ERRORS, MISTAKES, OR
                  INACCURACIES OF CONTENT, (ii) PERSONAL INJURY OR PROPERTY
                  DAMAGE, OF ANY NATURE WHATSOEVER, RESULTING FROM YOUR ACCESS
                  TO AND USE OF OUR SERVICES, (iii) ANY UNAUTHORIZED ACCESS TO
                  OR USE OF OUR SECURE SERVERS AND/OR ANY AND ALL PERSONAL
                  INFORMATION AND/OR FINANCIAL INFORMATION STORED THEREIN, (iv)
                  ANY INTERRUPTION OR CESSATION OF TRANSMISSION TO OR FROM OUR
                  SERVICES, (v) ANY BUGS, VIRUSES, TROJAN HORSES, OR THE LIKE,
                  WHICH MAY BE TRANSMITTED TO OR THROUGH OUR SERVICES BY ANY
                  THIRD PARTY, AND/OR (vi) ANY ERRORS OR OMISSIONS IN ANY
                  CONTENT OR FOR ANY LOSS OR DAMAGE OF ANY KIND INCURRED AS A
                  RESULT OF YOUR USE OF ANY CONTENT POSTED, EMAILED,
                  TRANSMITTED, OR OTHERWISE MADE AVAILABLE VIA THE SERVICES,
                  WHETHER BASED ON WARRANTY, CONTRACT, TORT, OR ANY OTHER LEGAL
                  THEORY, AND WHETHER OR NOT PLAYERTRACKER IS ADVISED OF THE
                  POSSIBILITY OF SUCH DAMAGES.
                </p>
                <p className="mb-4">
                  THE FOREGOING LIMITATION OF LIABILITY SHALL APPLY TO THE
                  FULLEST EXTENT PERMITTED BY LAW IN THE APPLICABLE
                  JURISDICTION. YOU SPECIFICALLY ACKNOWLEDGE THAT PLAYERTRACKER
                  SHALL NOT BE LIABLE FOR USER CONTENT OR THE DEFAMATORY,
                  OFFENSIVE, OR ILLEGAL CONDUCT OF ANY THIRD PARTY AND THAT THE
                  RISK OF HARM OR DAMAGE FROM THE FOREGOING RESTS ENTIRELY WITH
                  YOU.
                </p>
                <p>
                  SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OF CERTAIN
                  WARRANTIES OR THE LIMITATION OR EXCLUSION OF LIABILITY FOR
                  INCIDENTAL OR CONSEQUENTIAL DAMAGES. ACCORDINGLY, SOME OF THE
                  ABOVE LIMITATIONS MAY NOT APPLY TO YOU.
                </p>
              </div>
            )}
          </section>

          {/* Governing Law Section */}
          <section
            id="governing"
            className="bg-white rounded-lg border border-gray-200 overflow-hidden transition-all duration-300"
          >
            <button
              onClick={() => toggleSection("governing")}
              className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center">
                <Globe className="h-5 w-5 text-blue-600 mr-3" />
                <h3 className="text-xl font-semibold">9. Governing Law</h3>
              </div>
              {expandedSections.governing ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </button>

            {expandedSections.governing && (
              <div className="px-6 py-4 animate-fadeIn">
                <p className="mb-4">
                  These Terms shall be governed and construed in accordance with
                  the laws of the State of Delaware, United States, without
                  regard to its conflict of law provisions.
                </p>
                <p className="mb-4">
                  Our failure to enforce any right or provision of these Terms
                  will not be considered a waiver of those rights. If any
                  provision of these Terms is held to be invalid or
                  unenforceable by a court, the remaining provisions of these
                  Terms will remain in effect.
                </p>
                <p className="mb-4">
                  Any disputes arising out of or relating to these Terms or the
                  Services will be resolved exclusively in the federal or state
                  courts located in Delaware, and you consent to personal
                  jurisdiction in those courts.
                </p>
                <p>
                  These Terms constitute the entire agreement between us
                  regarding our Services, and supersede and replace any prior
                  agreements we might have had between us regarding the
                  Services.
                </p>
              </div>
            )}
          </section>

          {/* Changes to Terms Section */}
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
                <h3 className="text-xl font-semibold">10. Changes to Terms</h3>
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
                  We reserve the right, at our sole discretion, to modify or
                  replace these Terms at any time. We will provide notice of any
                  changes by posting the new Terms on this page and updating the
                  "Last Updated" date at the top of these Terms.
                </p>
                <p className="mb-4">
                  Your continued use of the Services after any such changes
                  constitutes your acceptance of the new Terms. If you do not
                  agree to the new terms, please stop using the Services.
                </p>
                <p className="mb-4">
                  It is your responsibility to review these Terms periodically
                  for changes. By continuing to access or use our Services after
                  those revisions become effective, you agree to be bound by the
                  revised terms.
                </p>
                <p>
                  We will provide more prominent notice of material changes to
                  these Terms, such as by sending you an email notification. We
                  encourage you to review these Terms periodically for any
                  changes.
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

export default RouteComponent;
