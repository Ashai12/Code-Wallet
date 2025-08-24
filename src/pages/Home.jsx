export default function Home() {
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh'}}>
        <div style={{flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="text">
            <h2>
              Code Wallet – A professional solution for managing code snippets.
            </h2>
            <h3>
              {" "}
              Code Wallet is a free tool designed to allow developers to
              centralize, organize, and efficiently reuse their code snippets.
              By providing a simple interface for copying and pasting code in
              both directions, the tool aims to improve productivity and the
              structuring of individual technical resources. Its business model
              is based on reselling qualified and anonymized technical data to
              companies in the IT sector, particularly those developing
              solutions based on artificial intelligence. Code Wallet combines
              ease of use with responsible data valuation.
            </h3>
          </div>
        </div>
      </div>
    </>
  );
}
