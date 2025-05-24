import Head from "next/head";

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy | Your Website</title>
        <meta name="description" content="Privacy policy of Your Website." />
      </Head>
      <div className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <p className="mb-4">
          Your privacy is important to us. This Privacy Policy explains how we
          collect, use, and protect your information.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">
          1. Information We Collect
        </h2>
        <p className="mb-4">
          We collect personal information when you use our website, such as your
          name, email, and usage data.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">
          2. How We Use Your Information
        </h2>
        <p className="mb-4">
          We use your data to improve our services, provide support, and ensure
          security.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">3. Data Security</h2>
        <p className="mb-4">
          We take reasonable security measures to protect your information.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">4. Contact Us</h2>
        <p className="mb-4">
          If you have any questions, please contact us at
          support@yourwebsite.com.
        </p>
      </div>
    </>
  );
}
