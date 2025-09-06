export default function Home() {
  const testEmail = import.meta.env.VITE_TEST_EMAIL;

  return (
    <div className="px-4 py-6 text-center max-w-xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold mb-4">
        Welcome to TraceMail Analyzer
      </h1>
      <p className="mb-4 text-gray-700">
        To test the system, please send an email to:
      </p>
      <div className="bg-gray-100 rounded-lg p-3 mb-6">
        <span className="font-mono text-blue-600">{testEmail}</span>
      </div>
      <p className="text-sm text-gray-600">
        Include the provided subject token in your subject line.  
        Example: <code>[TEST_TOKEN_ABC123] Hello</code>
      </p>
    </div>
  );
}
