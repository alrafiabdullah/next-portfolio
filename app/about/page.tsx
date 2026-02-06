export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-5 py-12">
      <h1
        className="mb-2 text-4xl font-bold"
        style={{ fontFamily: "var(--font-sans)", color: "var(--color-text-primary)" }}
      >
        About Me
      </h1>
      <p
        className="mb-8 text-sm uppercase tracking-widest"
        style={{ color: "var(--color-ui-muted)", fontFamily: "var(--font-sans)" }}
      >
        ML Engineer · NLP Researcher
      </p>

      <hr />

      <section className="mb-10">
        <p style={{ color: "var(--color-text-secondary)" }}>
          I&apos;m Abdullah Al Rafi — a Machine Learning Engineer currently pursuing
          my MSc in Natural Language Processing at Universität Trier, Germany.
          Previously, I built production ML systems at bKash Limited in Dhaka,
          including multilingual OCR solutions serving 100k+ requests per week.
        </p>
        <p style={{ color: "var(--color-text-secondary)" }}>
          This blog is where I write about machine learning, NLP, web development,
          and the occasional life update. For my full portfolio and work history,
          visit{" "}
          <a href="https://abdullahalrafi.com" target="_blank" rel="noopener noreferrer">
            abdullahalrafi.com
          </a>
          .
        </p>
      </section>

      <section>
        <h2
          className="mb-3 text-2xl font-semibold"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Get in Touch
        </h2>
        <p style={{ color: "var(--color-text-secondary)" }}>
          <a href="mailto:abdullah@abdullahalrafi.com">Email</a> ·{" "}
          <a href="https://github.com/alrafiabdullah" target="_blank" rel="noopener noreferrer">
            GitHub
          </a> ·{" "}
          <a href="https://www.linkedin.com/in/abdullahalrafi" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </p>
      </section>
    </main>
  );
}
