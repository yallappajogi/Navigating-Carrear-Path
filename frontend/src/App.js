import React, { useState } from "react";
import axios from "axios";

const colors = {
  bg: "#0B1120",
  bgGrid: "rgba(148, 163, 184, 0.08)",
  panel: "#131B2E",
  panelBorder: "#232D45",
  panelBorderStrong: "#2E3A56",
  accent: "#818CF8",
  accentSoft: "rgba(129, 140, 248, 0.12)",
  accentText: "#A5B4FC",
  textPrimary: "#F1F5F9",
  textSecondary: "#94A3B8",
  textMuted: "#5B6B85",
  success: "#34D399",
  successSoft: "rgba(52, 211, 153, 0.12)",
  warning: "#FBBF24",
  warningSoft: "rgba(251, 191, 36, 0.12)",
  danger: "#F87171",
};

const styles = {
  page: {
    minHeight: "100vh",
    width: "100%",
    background: `
      radial-gradient(circle at 15% 0%, rgba(129,140,248,0.14) 0%, transparent 45%),
      radial-gradient(circle at 85% 15%, rgba(52,211,153,0.08) 0%, transparent 40%),
      ${colors.bg}
    `,
    backgroundImage: `
      linear-gradient(${colors.bgGrid} 1px, transparent 1px),
      linear-gradient(90deg, ${colors.bgGrid} 1px, transparent 1px),
      radial-gradient(circle at 15% 0%, rgba(129,140,248,0.14) 0%, transparent 45%),
      radial-gradient(circle at 85% 15%, rgba(52,211,153,0.08) 0%, transparent 40%)
    `,
    backgroundSize: "40px 40px, 40px 40px, auto, auto",
    color: colors.textPrimary,
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    boxSizing: "border-box",
    padding: "72px 56px",
    display: "flex",
    flexDirection: "column",
  },
  footer: {
    marginTop: "auto",
    paddingTop: "56px",
    borderTop: `1px solid ${colors.panelBorder}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "12px",
    maxWidth: "1240px",
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  footerText: {
    fontSize: "12px",
    color: colors.textMuted,
    margin: 0,
  },
  footerLinks: {
    display: "flex",
    gap: "20px",
  },
  footerLink: {
    fontSize: "12px",
    color: colors.textSecondary,
    textDecoration: "none",
  },
  container: {
    width: "100%",
    maxWidth: "1240px",
    margin: "0 auto",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1.05fr 0.95fr",
    gap: "56px",
    alignItems: "start",
  },
  eyebrowRow: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "14px",
  },
  eyebrowDot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: colors.accent,
  },
  eyebrow: {
    fontSize: "12px",
    fontWeight: 600,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: colors.accentText,
    fontFamily: "'SFMono-Regular', Consolas, monospace",
  },
  title: {
    fontSize: "40px",
    fontWeight: 600,
    letterSpacing: "-0.02em",
    margin: "0 0 16px 0",
    lineHeight: 1.15,
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: "16px",
    color: colors.textSecondary,
    maxWidth: "480px",
    margin: 0,
    lineHeight: 1.65,
  },
  modelStack: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    marginTop: "36px",
  },
  modelCard: (accentColor) => ({
    borderLeft: `2px solid ${accentColor}`,
    background: "rgba(255,255,255,0.02)",
    borderRadius: "0 10px 10px 0",
    padding: "16px 20px",
  }),
  modelHeadRow: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "6px",
  },
  modelDot: (c) => ({
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: c,
    flexShrink: 0,
  }),
  modelName: {
    fontSize: "14px",
    fontWeight: 600,
    color: colors.textPrimary,
    margin: 0,
  },
  modelDesc: {
    fontSize: "13.5px",
    color: colors.textSecondary,
    margin: 0,
    lineHeight: 1.6,
    maxWidth: "440px",
  },
  card: {
    background: colors.panel,
    border: `1px solid ${colors.panelBorder}`,
    borderRadius: "16px",
    padding: "28px",
    boxShadow: "0 20px 60px -20px rgba(0,0,0,0.5)",
  },
  dropRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "16px",
    border: `1px dashed ${colors.panelBorderStrong}`,
    borderRadius: "10px",
    padding: "18px 20px",
    cursor: "pointer",
    background: "rgba(255,255,255,0.015)",
  },
  dropLeft: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    minWidth: 0,
  },
  fileIcon: {
    flexShrink: 0,
    width: "40px",
    height: "40px",
    borderRadius: "8px",
    background: colors.accentSoft,
    color: colors.accentText,
    fontSize: "11px",
    fontWeight: 700,
    letterSpacing: "0.02em",
    fontFamily: "'SFMono-Regular', Consolas, monospace",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  fileName: {
    fontSize: "14px",
    fontWeight: 500,
    color: colors.textPrimary,
    margin: 0,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  fileHint: {
    fontSize: "12px",
    color: colors.textMuted,
    margin: "3px 0 0 0",
  },
  browseBadge: {
    flexShrink: 0,
    fontSize: "12px",
    fontWeight: 600,
    color: colors.accentText,
    border: `1px solid ${colors.panelBorderStrong}`,
    borderRadius: "8px",
    padding: "8px 14px",
  },
  errorText: {
    fontSize: "13px",
    color: colors.danger,
    margin: "14px 0 0 0",
  },
  actionsRow: {
    display: "flex",
    alignItems: "center",
    gap: "18px",
    marginTop: "20px",
  },
  uploadButton: (disabled) => ({
    fontSize: "14px",
    fontWeight: 600,
    background: disabled ? colors.textMuted : colors.accent,
    color: "#0B1120",
    border: "none",
    borderRadius: "8px",
    padding: "11px 20px",
    cursor: disabled ? "not-allowed" : "pointer",
  }),
  resetButton: {
    fontSize: "14px",
    fontWeight: 500,
    color: colors.textSecondary,
    background: "none",
    border: "none",
    cursor: "pointer",
  },
  infoCard: {
    background: colors.panel,
    border: `1px solid ${colors.panelBorder}`,
    borderRadius: "16px",
    padding: "24px 28px",
    marginTop: "20px",
  },
  infoTitle: {
    fontSize: "13px",
    fontWeight: 600,
    color: colors.textPrimary,
    margin: "0 0 14px 0",
  },
  infoRow: {
    display: "flex",
    alignItems: "flex-start",
    gap: "12px",
    padding: "10px 0",
    borderTop: `1px solid ${colors.panelBorder}`,
  },
  infoRowFirst: {
    display: "flex",
    alignItems: "flex-start",
    gap: "12px",
    padding: "0 0 10px 0",
  },
  infoIndex: {
    fontSize: "11px",
    fontFamily: "'SFMono-Regular', Consolas, monospace",
    color: colors.accentText,
    background: colors.accentSoft,
    borderRadius: "6px",
    width: "22px",
    height: "22px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    marginTop: "1px",
  },
  infoText: {
    fontSize: "13px",
    color: colors.textSecondary,
    lineHeight: 1.55,
    margin: 0,
  },
  infoTextStrong: {
    color: colors.textPrimary,
    fontWeight: 500,
  },
  resultsCard: {
    background: colors.panel,
    border: `1px solid ${colors.panelBorder}`,
    borderRadius: "16px",
    marginTop: "40px",
    overflow: "hidden",
    boxShadow: "0 20px 60px -20px rgba(0,0,0,0.5)",
    gridColumn: "1 / -1",
  },
  resultsHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "20px 28px",
    borderBottom: `1px solid ${colors.panelBorder}`,
  },
  resultsTitle: {
    fontSize: "14px",
    fontWeight: 600,
    margin: 0,
    color: colors.textPrimary,
  },
  resultsCount: {
    fontSize: "12px",
    color: colors.textMuted,
    fontFamily: "'SFMono-Regular', Consolas, monospace",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "14px",
  },
  th: {
    textAlign: "left",
    fontSize: "11px",
    fontWeight: 600,
    letterSpacing: "0.03em",
    textTransform: "uppercase",
    color: colors.textMuted,
    padding: "12px 28px",
    borderBottom: `1px solid ${colors.panelBorder}`,
  },
  td: {
    padding: "12px 28px",
    borderBottom: `1px solid ${colors.panelBorder}`,
    color: colors.textPrimary,
    fontFamily: "'SFMono-Regular', Consolas, monospace",
    fontSize: "13px",
  },
  tdIndex: {
    padding: "12px 28px",
    borderBottom: `1px solid ${colors.panelBorder}`,
    color: colors.textMuted,
    fontFamily: "'SFMono-Regular', Consolas, monospace",
    fontSize: "13px",
  },
  badge: (agree) => ({
    fontSize: "12px",
    fontWeight: 600,
    borderRadius: "999px",
    padding: "3px 10px",
    background: agree ? colors.successSoft : colors.warningSoft,
    color: agree ? colors.success : colors.warning,
  }),
  footerNote: {
    fontSize: "12px",
    color: colors.textMuted,
    padding: "14px 28px",
    borderTop: `1px solid ${colors.panelBorder}`,
  },
};

const MODELS = [
  {
    name: "Gradient boosted trees",
    color: colors.accent,
    dot: colors.accent,
    desc:
      "Builds many small decision trees one after another, where each new tree corrects the mistakes of the last. Tends to be very accurate on structured, tabular data like this.",
  },
  {
    name: "Random forest",
    color: colors.success,
    dot: colors.success,
    desc:
      "Builds many decision trees independently and lets them vote on the outcome. More resistant to noisy or unusual records, at a small cost to raw accuracy.",
  },
];

const App = () => {
  const [file, setFile] = useState(null);
  const [predictions, setPredictions] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | loading | error
  const [errorMsg, setErrorMsg] = useState("");

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected && !selected.name.toLowerCase().endsWith(".csv")) {
      setErrorMsg("Please choose a .csv file.");
      setFile(null);
      return;
    }
    setErrorMsg("");
    setFile(selected || null);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      setErrorMsg("Choose a CSV file before uploading.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setStatus("loading");
    setErrorMsg("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/upload",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setPredictions(response.data.predictions);
      setStatus("idle");
    } catch (error) {
      console.error(error);
      setStatus("error");
      setErrorMsg(
        "Something went wrong while uploading. Check that the server is running and try again."
      );
    }
  };

  const reset = () => {
    setFile(null);
    setPredictions(null);
    setErrorMsg("");
    setStatus("idle");
  };

  const rowCount = predictions
    ? Math.max(
        predictions.GBT_Predictions.length,
        predictions.RF_Predictions.length
      )
    : 0;

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.grid}>
          {/* Left column: explanation */}
          <div>
            <div style={styles.eyebrowRow}>
              <span style={styles.eyebrowDot} />
              <span style={styles.eyebrow}>Career outcome model</span>
            </div>
            <h1 style={styles.title}>Career outcome prediction</h1>
            <p style={styles.subtitle}>
              Upload a CSV of candidate records and get a career outcome
              prediction from two different models, side by side.
            </p>

            <div style={styles.modelStack}>
              {MODELS.map((m) => (
                <div key={m.name} style={styles.modelCard(m.color)}>
                  <div style={styles.modelHeadRow}>
                    <span style={styles.modelDot(m.dot)} />
                    <p style={styles.modelName}>{m.name}</p>
                  </div>
                  <p style={styles.modelDesc}>{m.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right column: upload + info */}
          <div>
            <div style={styles.card}>
              <form onSubmit={handleUpload}>
                <label htmlFor="csv-upload" style={styles.dropRow}>
                  <div style={styles.dropLeft}>
                    <div style={styles.fileIcon}>CSV</div>
                    <div style={{ minWidth: 0 }}>
                      <p style={styles.fileName}>
                        {file ? file.name : "Choose a CSV file"}
                      </p>
                      <p style={styles.fileHint}>
                        {file ? "Ready to upload" : "Click to browse your files"}
                      </p>
                    </div>
                  </div>
                  <span style={styles.browseBadge}>Browse</span>
                  <input
                    id="csv-upload"
                    type="file"
                    accept=".csv"
                    hidden
                    onChange={handleFileChange}
                  />
                </label>

                {errorMsg && <p style={styles.errorText}>{errorMsg}</p>}

                <div style={styles.actionsRow}>
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    style={styles.uploadButton(status === "loading")}
                  >
                    {status === "loading" ? "Uploading…" : "Upload and predict"}
                  </button>
                  {predictions && (
                    <button
                      type="button"
                      onClick={reset}
                      style={styles.resetButton}
                    >
                      Start over
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div style={styles.infoCard}>
              <p style={styles.infoTitle}>How it works</p>
              <div style={styles.infoRowFirst}>
                <span style={styles.infoIndex}>1</span>
                <p style={styles.infoText}>
                  <span style={styles.infoTextStrong}>Upload your CSV. </span>
                  Each row should be one candidate record, formatted the same
                  way the models were trained on.
                </p>
              </div>
              <div style={styles.infoRow}>
                <span style={styles.infoIndex}>2</span>
                <p style={styles.infoText}>
                  <span style={styles.infoTextStrong}>Both models run. </span>
                  Gradient boosted trees and random forest each score every
                  record independently.
                </p>
              </div>
              <div style={styles.infoRow}>
                <span style={styles.infoIndex}>3</span>
                <p style={styles.infoText}>
                  <span style={styles.infoTextStrong}>Compare results. </span>
                  Rows where the models disagree are flagged, so you know
                  which predictions are worth a second look.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        {predictions && (
          <div style={styles.resultsCard}>
            <div style={styles.resultsHeader}>
              <h2 style={styles.resultsTitle}>Predictions</h2>
              <span style={styles.resultsCount}>
                {rowCount} record{rowCount === 1 ? "" : "s"}
              </span>
            </div>

            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={{ ...styles.th, width: "48px" }}>#</th>
                  <th style={styles.th}>Gradient boosted trees</th>
                  <th style={styles.th}>Random forest</th>
                  <th style={{ ...styles.th, width: "96px" }}>Agreement</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: Math.min(rowCount, 25) }).map((_, i) => {
                  const gbt = predictions.GBT_Predictions[i];
                  const rf = predictions.RF_Predictions[i];
                  const agree = gbt === rf;
                  return (
                    <tr key={i}>
                      <td style={styles.tdIndex}>{i + 1}</td>
                      <td style={styles.td}>{gbt ?? "—"}</td>
                      <td style={styles.td}>{rf ?? "—"}</td>
                      <td style={styles.td}>
                        <span style={styles.badge(agree)}>
                          {agree ? "Match" : "Differ"}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {rowCount > 25 && (
              <div style={styles.footerNote}>
                Showing the first 25 of {rowCount} records.
              </div>
            )}
          </div>
        )}
      </div>

      <div style={styles.footer}>
        <p style={styles.footerText}>
          Career outcome model · predictions are estimates, not guarantees
        </p>
        <div style={styles.footerLinks}>
          <a href="#" style={styles.footerLink}>
            Documentation
          </a>
          <a href="#" style={styles.footerLink}>
            Data format
          </a>
          <a href="#" style={styles.footerLink}>
            Support
          </a>
        </div>
      </div>
    </div>
  );
};

export default App;