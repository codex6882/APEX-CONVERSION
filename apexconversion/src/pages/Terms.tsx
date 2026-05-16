import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const LegalPage = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="min-h-screen bg-white">
    <Navbar />
    <div className="pt-24 pb-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-heading font-bold text-sky-900 mb-2">{title}</h1>
        <p className="text-gray-400 text-sm font-body mb-8">Last updated: January 1, 2026</p>
        <div className="space-y-6 font-body text-gray-600 leading-relaxed">{children}</div>
      </div>
    </div>
    <Footer />
  </div>
)

const S = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div><h2 className="text-xl font-heading font-bold text-sky-900 mb-3">{title}</h2><div className="space-y-2">{children}</div></div>
)

export const Terms = () => (
  <LegalPage title="Terms of Service">
    <S title="1. Account Registration"><p>By registering on Apex Conversion Affiliates, you agree to provide accurate and complete information. You are responsible for maintaining the confidentiality of your account credentials.</p></S>
    <S title="2. Platform Usage"><p>Apex Conversion Affiliates grants you a limited, non-exclusive license to use the platform for personal earning purposes. You may not use the platform for any unlawful purpose.</p></S>
    <S title="3. Affiliate Earnings"><p>Earnings are determined by the admin based on your affiliate activity. The $8 welcome bonus is non-withdrawable and for promotional purposes only.</p></S>
    <S title="4. Deposits and Withdrawals"><p>All deposits require admin confirmation before balance updates. Withdrawals require a valid Swift Code provided by our team and are subject to admin approval.</p></S>
    <S title="5. Prohibited Activities"><p>Users may not create multiple accounts, submit fraudulent activity, attempt to hack the platform, or engage in any activity that violates applicable law.</p></S>
    <S title="6. Termination"><p>Apex Conversion Affiliates reserves the right to terminate accounts that violate these terms without prior notice.</p></S>
    <S title="7. Governing Law"><p>These terms are governed by the laws of the United States of America.</p></S>
  </LegalPage>
)

export const Privacy = () => (
  <LegalPage title="Privacy Policy">
    <S title="1. Information We Collect"><p>We collect information you provide during registration including name, email, phone number, and country. We also collect usage data and transaction history.</p></S>
    <S title="2. How We Use Your Information"><p>Your information is used solely to operate the platform, process payments, verify identity, and provide customer support.</p></S>
    <S title="3. Data Storage and Security"><p>All data is stored securely using Supabase with industry-standard encryption. We implement appropriate security measures to protect your information.</p></S>
    <S title="4. Third Party Sharing"><p>We do not sell, trade, or share your personal information with third parties except as required by law.</p></S>
    <S title="5. User Rights"><p>You have the right to access, correct, or delete your personal data. Contact us at support@apexconversion.com to exercise these rights.</p></S>
    <S title="6. Data Retention"><p>We retain your data for as long as your account is active. Upon account deletion, data is removed within 90 days.</p></S>
  </LegalPage>
)

export const Cookies = () => (
  <LegalPage title="Cookie Policy">
    <S title="1. What Cookies We Use"><p>Apex Conversion Affiliates uses essential session cookies to keep you logged in and remember your preferences. We do not use advertising or tracking cookies.</p></S>
    <S title="2. Why We Use Them"><p>Cookies are necessary for the platform to function correctly, including maintaining your login session and securing your account.</p></S>
    <S title="3. How to Control Cookies"><p>You can control cookies through your browser settings. Disabling essential cookies may affect platform functionality.</p></S>
    <S title="4. Third Party Cookies"><p>No third party tracking cookies are used on this platform.</p></S>
  </LegalPage>
)

export default Terms
