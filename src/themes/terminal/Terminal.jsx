import s from "./theme-terminal.module.css";
import {
  useRouter as I,
  ReactNamespace as x,
  siteData as i,
  pages as $,
  jsx as e,
  CountUp as M,
  React as v,
  disciplineLabels as A,
  Glyph as K,
  ProjectFigure as E,
  formatDate as W,
  useReducedMotion as O,
  parseDateRange as H,
} from "../../App.jsx";
const P = [
    "                                  :--:",
    "                                ~+****+~-.",
    "                              ~*##%###**+=:",
    "                             -#%%#+====**#*",
    "                             :*~~=+=-==+++#.",
    "                              =::-~-:=~--~+~",
    "                              :::~~--=+~-==",
    "                  .-  -=-:     :-~~--~+=-+:",
    "                 .~ :~~-: :     :::-~=+~=:",
    "                .--:--~.:-     :.:::--~++=",
    "               .-~-:----    .-=-..:-=++=++*+-.",
    "             ~-:--:..:- .-+####=::::---~--@%%%##+~.",
    "           .~##*=:.::-~~*#%#####*+~-::~++#%%%%#####*.",
    "         ~+*#%%%%#*+**%@%%%##%%####*+#%%%%%%#######%%:",
    "       .++*#%@%%%@@%%%@@%%%%%#%%##########%###%###%#%#",
    "      -+***%@@@@@@%@@%@@@%%%%%%%##################%#@%*",
    "     -****##%%@@@@@@@@@@@@%%%%################%###@%@%%~",
    "     ****##%%%@@@@@@@@@@@@%%%%################%##%@%@%%#",
    "    -#*#%%@%%%@@@@@@@@@@@%%%%################%%%%%@@%%%%-",
    "    *##%%%%##%@@@@%%%@@@@%%%################%%%%%@@@%%%%+",
    "   -*%%%###%%@@%=   -@%%%%%%###############%%%@@@@@%%%%%#",
    "   :#%%####@@@-     -%%%%%%################%%@@@@@@%%%%%%",
    "    +%%#%%@%+       .%%%%#################%%%@@@@@@@@%%@%-",
    "     .::.           .#%##################%%%%%@@@@@@%%@%%+",
    "                    .#####################%%%%@@@@@@%%%%%*",
    "                     ++++++++++++++++++++++*****##****+**-",
  ],
  f = [
    {
      text: "$ ./init",
    },
    {
      text: "loading profile ................. ok",
      tone: "ok",
    },
    {
      text: `indexing experience ............. ${i.roles.length} records`,
      tone: "ok",
    },
    {
      text: `indexing work ................... ${i.projects.length} projects`,
      tone: "ok",
    },
    {
      text: "checking availability ........... open",
      tone: "ok",
    },
    {
      text: `resolving domains ............... ${i.industries.length} (by design)`,
      tone: "warn",
    },
    {
      text: "ready.",
    },
  ],
  qs = ({ animate: c }) => {
    const p = O() || !c,
      [h, _] = x.useState(p ? f.length : 0);
    return (
      x.useEffect(() => {
        if (p) {
          _(f.length);
          return;
        }
        if (h >= f.length) return;
        const j = setTimeout(() => _((u) => u + 1), 170);
        return () => clearTimeout(j);
      }, [h, p]),
      (
        <div className={s.boot}>
          {f.slice(0, h).map((j, u) => (
            <div
              className={[
                s.bootLine,
                j.tone === "ok" ? s.bootOk : "",
                j.tone === "warn" ? s.bootWarn : "",
              ]
                .filter(Boolean)
                .join(" ")}
              key={u}
            >
              {j.text}
            </div>
          ))}
        </div>
      )
    );
  },
  d = ({ text: c, flag: r, first: p }) => (
    <div
      className={[s.cmd, p === !0 ? s.cmdFirst : ""].filter(Boolean).join(" ")}
    >
      {<span className={s.prompt}>{"$"}</span>}
      {<span className={s.cmdText}>{c}</span>}
      {r != null && <span className={s.cmdFlag}>{r}</span>}
    </div>
  ),
  S = 46,
  ys = ({ onPick: c }) => {
    const r = i.roles.map((n) => ({
        role: n,
        span: H(n.period),
      })),
      p = Math.floor(Math.min(...r.map((n) => n.span[0]))),
      h = Math.ceil(Math.max(...r.map((n) => n.span[1]))),
      _ = (n) => Math.round(((n - p) / (h - p)) * S),
      j = [];
    for (let n = p % 2 === 0 ? p : p + 1; n <= h; n += 2) j.push(n);
    const u = Array.from(
        {
          length: S + 1,
        },
        (n, m) => (j.some((o) => _(o) === m) ? "┬" : "─"),
      ).join(""),
      w = j.reduce((n, m) => {
        const o = Math.min(_(m), S - 3);
        return n.padEnd(o, " ").slice(0, o) + String(m);
      }, "");
    return (
      <div className={s.gantt}>
        {<pre className={s.ganttRule}>{u}</pre>}
        {<pre className={s.ganttLabels}>{w}</pre>}
        {r.map(({ role: n, span: m }) => {
          const o = _(m[0]),
            b = Math.max(o + 1, _(m[1]));
          return (
            <button
              type="button"
              className={s.ganttRow}
              onClick={() => c(n.id)}
              title={`${n.title} - ${n.company} (${n.period})`}
              key={n.id}
            >
              {
                <pre className={s.ganttTrack}>
                  {" ".repeat(o)}
                  {
                    <span
                      className={s.ganttBar}
                      style={{
                        "--project-h": String(n.hue ?? 150),
                      }}
                    >
                      {"█".repeat(b - o)}
                    </span>
                  }
                </pre>
              }
              {
                <span className={s.ganttName}>
                  {n.company}
                  {<span className={s.ganttRole}> {n.title}</span>}
                </span>
              }
            </button>
          );
        })}
      </div>
    );
  };
function B(c) {
  return `${c.company
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")}.md`;
}
const Ls = () => {
  const {
      view: c,
      setView: r,
      scrollRef: p,
      workByRole: h,
      projectById: _,
      experience: j,
      education: u,
      personal: w,
      role: n,
      siblings: m,
      roleIndex: o,
    } = I({
      handleEscape: !1,
    }),
    [b, N] = x.useState(!1),
    [q, y] = x.useState(""),
    [C, g] = x.useState(0),
    R = x.useRef(null),
    F = x.useRef(!1),
    L = x.useMemo(
      () => [
        ...i.roles.map((a) => ({
          id: a.id,
          kind: "record",
          label: `${a.company} - ${a.title}`,
          meta: a.period,
          run: () =>
            r({
              kind: "role",
              id: a.id,
            }),
        })),
        ...i.projects.map((a) => ({
          id: a.id,
          kind: "record",
          label: `${a.name} - ${a.tagline}`,
          meta: a.period,
          run: () =>
            r({
              kind: "project",
              id: a.id,
            }),
        })),
        ...$.map((a) => ({
          id: a.id,
          kind: "page",
          label: a.id,
          meta: "",
          run: () =>
            r({
              kind: "page",
              id: a.id,
            }),
        })),
        {
          id: "index",
          kind: "page",
          label: "experience (index)",
          meta: "",
          run: () =>
            r({
              kind: "index",
            }),
        },
      ],
      [r],
    ),
    k = x.useMemo(() => {
      const a = q.trim().toLowerCase();
      return a === "" ? L : L.filter((l) => l.label.toLowerCase().includes(a));
    }, [L, q]);
  x.useEffect(() => {
    c.kind === "index" && (F.current = !0);
  }, [c]),
    x.useEffect(() => {
      const a = (l) => {
        if ((l.metaKey || l.ctrlKey) && l.key.toLowerCase() === "k") {
          l.preventDefault(), N((t) => !t), y(""), g(0);
          return;
        }
        if (l.key === "Escape") {
          b
            ? N(!1)
            : c.kind !== "index" &&
              r({
                kind: "index",
              });
          return;
        }
        if (b) {
          if (l.key === "ArrowDown")
            l.preventDefault(),
              g((t) => Math.min(t + 1, Math.max(k.length - 1, 0)));
          else if (l.key === "ArrowUp")
            l.preventDefault(), g((t) => Math.max(t - 1, 0));
          else if (l.key === "Enter") {
            l.preventDefault();
            const t = k[C];
            t != null && (t.run(), N(!1));
          }
        }
      };
      return (
        window.addEventListener("keydown", a),
        () => window.removeEventListener("keydown", a)
      );
    }, [b, k, C, c, r]),
    x.useEffect(() => {
      b && R.current?.focus();
    }, [b]);
  const T =
    c.kind === "index"
      ? "~/experience"
      : c.kind === "role" && n != null
        ? `~/${n.discipline === "education" ? "education" : "experience"}/${B(n)}`
        : `~/${c.kind === "page" ? c.id : ""}`;
  return (
    <div className={s.root} ref={p}>
      {<div className={s.scanlines} aria-hidden={!0} />}
      {<div className={s.vignette} aria-hidden={!0} />}
      {
        <nav className={s.bar} aria-label="Primary">
          {
            <span className={s.barPath}>
              {"eric@han"}
              {
                <span className={s.barPathDim}>
                  {":"}
                  {T}
                  {"$"}
                </span>
              }
            </span>
          }
          {<span className={s.barSpacer} />}
          {
            <button
              type="button"
              className={[
                s.barCmd,
                c.kind === "index" || c.kind === "role" ? s.barCmdActive : "",
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={() =>
                r({
                  kind: "index",
                })
              }
            >
              {"experience"}
            </button>
          }
          {$.map((a) => (
            <button
              type="button"
              className={[
                s.barCmd,
                c.kind === "page" && c.id === a.id ? s.barCmdActive : "",
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={() =>
                r({
                  kind: "page",
                  id: a.id,
                })
              }
              key={a.id}
            >
              {a.id}
            </button>
          ))}
          {
            <button
              type="button"
              className={s.barCmd}
              onClick={() => {
                N(!0), y(""), g(0);
              }}
            >
              {"⌘K"}
            </button>
          }
        </nav>
      }
      {
        <div className={s.page} id="content" tabIndex={-1}>
          {c.kind === "index" && (
            <e.Fragment>
              {e.jsx(qs, {
                animate: !F.current,
              })}
              {e.jsx(d, {
                text: "whoami",
                flag: "--verbose",
                first: !0,
              })}
              {
                <div className={s.out}>
                  {<p className={s.who}>{i.headline}</p>}
                  {<p className={s.whoSub}>{i.subhead}</p>}
                  {
                    <div className={s.kv}>
                      {<span className={s.kvKey}>{"current"}</span>}
                      {<span className={s.kvVal}>{i.kicker}</span>}
                      {<span className={s.kvKey}>{"location"}</span>}
                      {<span className={s.kvVal}>{i.location}</span>}
                      {<span className={s.kvKey}>{"domains"}</span>}
                      {
                        <span className={s.kvVal}>
                          {i.industries.join(", ").toLowerCase()}
                        </span>
                      }
                      {<span className={s.kvKey}>{"contact"}</span>}
                      {
                        <span className={s.kvVal}>
                          {<a href={`mailto:${i.email}`}>{i.email}</a>}
                        </span>
                      }
                    </div>
                  }
                  {
                    <div className={s.metrics}>
                      {i.headlineMetrics.map((a) => (
                        <div key={a.label}>
                          {
                            <div className={s.metricValue}>
                              {<M value={a.value} />}
                            </div>
                          }
                          {<div className={s.metricLabel}>{a.label}</div>}
                        </div>
                      ))}
                    </div>
                  }
                </div>
              }
              {
                <div className={s.marks}>
                  {<span className={s.marksLabel}>{"worked at"}</span>}
                  {i.roles
                    .filter((a) => a.mark != null)
                    .map((a, l, t) => (
                      <v.Fragment key={a.id}>
                        {<span>{a.mark?.label}</span>}
                        {l < t.length - 1 && (
                          <span className={s.markSep}>{"/"}</span>
                        )}
                      </v.Fragment>
                    ))}
                </div>
              }
              {
                <div className={s.marks}>
                  {<span className={s.marksLabel}>{"delivered for"}</span>}
                  {i.clients.map((a, l, t) => (
                    <v.Fragment key={a.label}>
                      {<span>{a.label}</span>}
                      {l < t.length - 1 && (
                        <span className={s.markSep}>{"/"}</span>
                      )}
                    </v.Fragment>
                  ))}
                </div>
              }
              {e.jsx(d, {
                text: "ls experience/",
                flag: "-l",
              })}
              {
                <div className={s.out}>
                  {
                    <div className={s.lsHead}>
                      {<span>{"period"}</span>}
                      {<span>{"role"}</span>}
                      {<span>{"work"}</span>}
                      {<span />}
                    </div>
                  }
                  {j.map((a) => {
                    const l = h.get(a.id) ?? [];
                    return (
                      <button
                        type="button"
                        className={s.lsRow}
                        onClick={() =>
                          r({
                            kind: "role",
                            id: a.id,
                          })
                        }
                        key={a.id}
                      >
                        {<span className={s.lsWhen}>{a.period}</span>}
                        {
                          <span>
                            {
                              <span className={s.lsName}>
                                {a.title}{" "}
                                {
                                  <span className={s.lsOrg}>
                                    {"@ "}
                                    {a.company}
                                  </span>
                                }
                              </span>
                            }
                            {<span className={s.lsSummary}>{a.summary}</span>}
                          </span>
                        }
                        {
                          <span className={s.lsCount}>
                            {l.length > 0
                              ? `${l.length} project${l.length === 1 ? "" : "s"}`
                              : "—"}
                          </span>
                        }
                        {<span className={s.lsArrow}>{"›"}</span>}
                      </button>
                    );
                  })}
                </div>
              }
              {e.jsx(d, {
                text: "ls education/",
                flag: "-l",
              })}
              {
                <div className={s.out}>
                  {u.map((a) => (
                    <button
                      type="button"
                      className={s.lsRow}
                      onClick={() =>
                        r({
                          kind: "role",
                          id: a.id,
                        })
                      }
                      key={a.id}
                    >
                      {<span className={s.lsWhen}>{a.period}</span>}
                      {
                        <span>
                          {
                            <span className={s.lsName}>
                              {a.title}{" "}
                              {
                                <span className={s.lsOrg}>
                                  {"@ "}
                                  {a.company}
                                </span>
                              }
                            </span>
                          }
                          {<span className={s.lsSummary}>{a.summary}</span>}
                        </span>
                      }
                      {<span className={s.lsCount}>{"degree"}</span>}
                      {<span className={s.lsArrow}>{"›"}</span>}
                    </button>
                  ))}
                </div>
              }
              {w.length > 0 && (
                <e.Fragment>
                  {e.jsx(d, {
                    text: "ls personal/",
                    flag: "-l",
                  })}
                  {
                    <div className={s.out}>
                      {w.map((a) => {
                        const l = h.get(a.id) ?? [];
                        return (
                          <button
                            type="button"
                            className={s.lsRow}
                            onClick={() =>
                              r({
                                kind: "role",
                                id: a.id,
                              })
                            }
                            key={a.id}
                          >
                            {<span className={s.lsWhen}>{a.period}</span>}
                            {
                              <span>
                                {
                                  <span className={s.lsName}>
                                    {a.title}{" "}
                                    {
                                      <span className={s.lsOrg}>
                                        {"@ "}
                                        {a.company}
                                      </span>
                                    }
                                  </span>
                                }
                                {
                                  <span className={s.lsSummary}>
                                    {a.summary}
                                  </span>
                                }
                              </span>
                            }
                            {
                              <span className={s.lsCount}>
                                {l.length > 0
                                  ? `${l.length} project${l.length === 1 ? "" : "s"}`
                                  : "—"}
                              </span>
                            }
                            {<span className={s.lsArrow}>{"›"}</span>}
                          </button>
                        );
                      })}
                    </div>
                  }
                </e.Fragment>
              )}
              {e.jsx(d, {
                text: "./timeline",
              })}
              {
                <div className={s.out}>
                  {
                    <p className={s.pageNote}>
                      {"Overlaps, and how long each one ran. Click a bar."}
                    </p>
                  }
                  {e.jsx(ys, {
                    onPick: (a) =>
                      r({
                        kind: "role",
                        id: a,
                      }),
                  })}
                </div>
              }
              {e.jsx(d, {
                text: "echo",
                flag: '"press ⌘K to jump to any record"',
              })}
            </e.Fragment>
          )}
          {c.kind === "role" && n != null && (
            <e.Fragment>
              {e.jsx(d, {
                text: `cat experience/${B(n)}`,
                first: !0,
              })}
              {
                <div className={s.out}>
                  {
                    <div className={s.recHead}>
                      {<div className={s.recOrg}>{n.company}</div>}
                      {<h1 className={s.recTitle}>{n.title}</h1>}
                      {
                        <div className={s.recMeta}>
                          {<span>{n.period}</span>}
                          {<span>{A[n.discipline]}</span>}
                        </div>
                      }
                      {<p className={s.recSummary}>{n.summary}</p>}
                    </div>
                  }
                  {n.highlights.length > 0 && (
                    <e.Fragment>
                      {<div className={s.sectionLabel}>{"## what i did"}</div>}
                      {
                        <ul className={s.bullets}>
                          {n.highlights.map((a) => (
                            <li key={a}>{a}</li>
                          ))}
                        </ul>
                      }
                    </e.Fragment>
                  )}
                  {(h.get(n.id) ?? []).length > 0 && (
                    <e.Fragment>
                      {<div className={s.sectionLabel}>{"## built here"}</div>}
                      {(h.get(n.id) ?? []).map((a) => (
                        <button
                          type="button"
                          className={s.lsRow}
                          onClick={() =>
                            r({
                              kind: "project",
                              id: a.id,
                            })
                          }
                          key={a.id}
                        >
                          {<span className={s.lsWhen}>{a.period}</span>}
                          {
                            <span>
                              {<span className={s.lsName}>{a.name}</span>}
                              {<span className={s.lsSummary}>{a.tagline}</span>}
                            </span>
                          }
                          {
                            <span className={s.lsCount}>
                              {a.featured === !0 ? "flagship" : "—"}
                            </span>
                          }
                          {<span className={s.lsArrow}>{"›"}</span>}
                        </button>
                      ))}
                    </e.Fragment>
                  )}
                  {
                    <div className={s.pager}>
                      {o > 0 ? (
                        <button
                          type="button"
                          className={s.pagerBtn}
                          onClick={() =>
                            r({
                              kind: "role",
                              id: m[o - 1].id,
                            })
                          }
                        >
                          {<span className={s.pagerLabel}>{"← newer"}</span>}
                          {
                            <span className={s.pagerName}>
                              {m[o - 1].company}
                            </span>
                          }
                        </button>
                      ) : (
                        <span />
                      )}
                      {
                        <button
                          type="button"
                          className={s.pagerBtn}
                          onClick={() =>
                            r({
                              kind: "index",
                            })
                          }
                        >
                          {<span className={s.pagerLabel}>{"cd .."}</span>}
                          {
                            <span className={s.pagerName}>
                              {"all experience"}
                            </span>
                          }
                        </button>
                      }
                      {o < m.length - 1 && (
                        <button
                          type="button"
                          className={s.pagerBtn}
                          style={{
                            textAlign: "right",
                          }}
                          onClick={() =>
                            r({
                              kind: "role",
                              id: m[o + 1].id,
                            })
                          }
                        >
                          {<span className={s.pagerLabel}>{"older →"}</span>}
                          {
                            <span className={s.pagerName}>
                              {m[o + 1].company}
                            </span>
                          }
                        </button>
                      )}
                    </div>
                  }
                </div>
              }
            </e.Fragment>
          )}
          {c.kind === "page" && c.id === "work" && (
            <e.Fragment>
              {e.jsx(d, {
                text: "ls work/",
                flag: "-l",
                first: !0,
              })}
              {
                <div className={s.out}>
                  {
                    <p className={s.pageNote}>
                      {
                        "The same work the experience records cover, indexed by the thing built rather than by who it was built for. Every row opens the full write-up."
                      }
                    </p>
                  }
                  {
                    <div className={[s.lsHead, s.lsHeadWork].join(" ")}>
                      {<span>{"period"}</span>}
                      {<span>{"project"}</span>}
                      {<span>{"built at"}</span>}
                      {<span />}
                      {<span />}
                    </div>
                  }
                  {i.projects.map((a) => {
                    const l = i.roles.find((t) => t.id === a.roleId);
                    return (
                      <button
                        type="button"
                        className={[s.lsRow, s.lsRowWork].join(" ")}
                        style={{
                          "--project-h": String(a.hue),
                        }}
                        onClick={() =>
                          r({
                            kind: "project",
                            id: a.id,
                          })
                        }
                        key={a.id}
                      >
                        {<span className={s.lsWhen}>{a.period}</span>}
                        {
                          <span>
                            {<span className={s.lsName}>{a.name}</span>}
                            {<span className={s.lsSummary}>{a.tagline}</span>}
                          </span>
                        }
                        {
                          <span className={s.lsCount}>
                            {l != null ? l.company.toLowerCase() : "personal"}
                          </span>
                        }
                        {<span className={s.lsGlyph}>{<K kind={a.id} />}</span>}
                        {<span className={s.lsArrow}>{"›"}</span>}
                      </button>
                    );
                  })}
                </div>
              }
            </e.Fragment>
          )}
          {c.kind === "project" &&
            (() => {
              const a = _.get(c.id);
              if (a == null) return null;
              const l = i.roles.find((t) => t.id === a.roleId);
              return (
                <div
                  className={s.project}
                  style={{
                    "--project-h": String(a.hue),
                  }}
                >
                  {e.jsx(d, {
                    text: `cat work/${a.id}.md`,
                    first: !0,
                  })}
                  {
                    <div className={s.out}>
                      {<h1 className={s.recTitle}>{a.name}</h1>}
                      {
                        <div className={s.recMeta}>
                          {<span>{a.period}</span>}
                          {<span>{a.role}</span>}
                          {l != null && <span>{l.company}</span>}
                        </div>
                      }
                      {<p className={s.recSummary}>{a.tagline}</p>}
                    </div>
                  }
                  {a.clientId != null && (
                    <e.Fragment>
                      {e.jsx(d, {
                        text: `cat clients/${a.clientId}.md`,
                      })}
                      {
                        <div className={s.out}>
                          {
                            <p className={s.body}>
                              {
                                i.companies.find((t) => t.id === a.clientId)
                                  ?.blurb
                              }
                            </p>
                          }
                          {
                            <div className={s.tags}>
                              {(
                                i.companies.find((t) => t.id === a.clientId)
                                  ?.facts ?? []
                              ).map((t) => (
                                <span className={s.tag} key={t}>
                                  {t}
                                </span>
                              ))}
                            </div>
                          }
                        </div>
                      }
                    </e.Fragment>
                  )}
                  {a.situation != null && (
                    <e.Fragment>
                      {e.jsx(d, {
                        text: "cat situation",
                      })}
                      {
                        <div className={s.out}>
                          {<p className={s.body}>{a.situation}</p>}
                        </div>
                      }
                    </e.Fragment>
                  )}
                  {a.constraint != null && (
                    <e.Fragment>
                      {e.jsx(d, {
                        text: "cat constraint",
                      })}
                      {
                        <div className={s.out}>
                          {<p className={s.body}>{a.constraint}</p>}
                        </div>
                      }
                    </e.Fragment>
                  )}
                  {e.jsx(d, {
                    text: "cat built",
                  })}
                  {
                    <div className={s.out}>
                      {<p className={s.body}>{a.body}</p>}
                      {(a.components ?? []).map((t) => (
                        <div className={s.row} key={t.name}>
                          {<span className={s.rowKey}>{t.name}</span>}
                          {<p className={s.rowText}>{t.note}</p>}
                        </div>
                      ))}
                      {
                        <div className={s.tags}>
                          {a.stack.map((t) => (
                            <span className={s.tag} key={t}>
                              {t}
                            </span>
                          ))}
                        </div>
                      }
                    </div>
                  }
                  {a.visual != null && (
                    <e.Fragment>
                      {e.jsx(d, {
                        text: "./plot",
                        flag: a.visual,
                      })}
                      {<E visual={a.visual} />}
                    </e.Fragment>
                  )}
                  {(a.learned ?? []).length > 0 && (
                    <e.Fragment>
                      {e.jsx(d, {
                        text: "cat learned.md",
                      })}
                      {
                        <div className={s.out}>
                          {(a.learned ?? []).map((t) => (
                            <p className={s.body} key={t.slice(0, 40)}>
                              {t}
                            </p>
                          ))}
                        </div>
                      }
                    </e.Fragment>
                  )}
                  {a.metrics.length > 0 && (
                    <e.Fragment>
                      {e.jsx(d, {
                        text: "cat outcome",
                      })}
                      {
                        <div className={s.out}>
                          {
                            <div className={s.kv}>
                              {a.metrics.map((t) => (
                                <v.Fragment key={t.label}>
                                  {<span className={s.kvKey}>{t.value}</span>}
                                  {<span className={s.kvVal}>{t.label}</span>}
                                </v.Fragment>
                              ))}
                            </div>
                          }
                        </div>
                      }
                    </e.Fragment>
                  )}
                  {a.demo != null && (
                    <e.Fragment>
                      {e.jsx(d, {
                        text: "cat demo",
                      })}
                      {
                        <div className={s.out}>
                          {
                            <div className={s.row}>
                              {<span className={s.rowKey}>{a.demo.label}</span>}
                              {<p className={s.rowText}>{a.demo.note}</p>}
                            </div>
                          }
                          {
                            <div className={s.tags}>
                              {
                                <span className={s.tag}>
                                  {a.demo.status === "live"
                                    ? "available"
                                    : "in progress"}
                                </span>
                              }
                            </div>
                          }
                        </div>
                      }
                    </e.Fragment>
                  )}
                  {
                    <div className={s.pager}>
                      {
                        <button
                          type="button"
                          className={s.pagerBtn}
                          onClick={() =>
                            r({
                              kind: "page",
                              id: "work",
                            })
                          }
                        >
                          {<span className={s.pagerLabel}>{"cd .."}</span>}
                          {<span className={s.pagerName}>{"work/"}</span>}
                        </button>
                      }
                      {l != null && (
                        <button
                          type="button"
                          className={s.pagerBtn}
                          onClick={() =>
                            r({
                              kind: "role",
                              id: l.id,
                            })
                          }
                        >
                          {
                            <span className={s.pagerLabel}>
                              {"built during"}
                            </span>
                          }
                          {<span className={s.pagerName}>{l.company}</span>}
                        </button>
                      )}
                    </div>
                  }
                </div>
              );
            })()}
          {c.kind === "page" && c.id === "about" && (
            <e.Fragment>
              {e.jsx(d, {
                text: "cat wave.txt",
                first: !0,
              })}
              {
                <div className={s.out}>
                  {
                    <pre
                      className={s.ascii}
                      aria-label="ASCII drawing of Eric Han waving"
                    >
                      {P.join(`
`)}
                    </pre>
                  }
                </div>
              }
              {e.jsx(d, {
                text: "cat about.md",
              })}
              {
                <div className={`${s.out} ${s.prose}`}>
                  {i.about.map((a, l) => (
                    <p key={l}>{a}</p>
                  ))}
                </div>
              }
              {e.jsx(d, {
                text: "ls domains/",
              })}
              {
                <div className={s.out}>
                  {
                    <div className={s.tags}>
                      {i.industries.map((a) => (
                        <span className={s.tag} key={a}>
                          {a.toLowerCase()}
                        </span>
                      ))}
                    </div>
                  }
                </div>
              }
              {e.jsx(d, {
                text: "ls skills/",
              })}
              {
                <div className={s.out}>
                  {
                    <div className={s.cols}>
                      {i.skills.map((a) => (
                        <div key={a.label}>
                          {<div className={s.colHead}>{a.label}</div>}
                          {
                            <ul className={s.colList}>
                              {a.items.map((l) => (
                                <li key={l}>{l}</li>
                              ))}
                            </ul>
                          }
                        </div>
                      ))}
                    </div>
                  }
                </div>
              }
              {e.jsx(d, {
                text: "cat misc.txt",
              })}
              {
                <div className={s.out}>
                  {
                    <div className={s.kv}>
                      {i.stats.map((a) => (
                        <v.Fragment key={a.label}>
                          {<span className={s.kvKey}>{a.label}</span>}
                          {<span className={s.kvVal}>{a.value}</span>}
                        </v.Fragment>
                      ))}
                    </div>
                  }
                </div>
              }
            </e.Fragment>
          )}
          {c.kind === "page" && c.id === "writing" && (
            <e.Fragment>
              {e.jsx(d, {
                text: "ls writing/",
                flag: "-l",
                first: !0,
              })}
              {
                <div className={s.out}>
                  {i.posts.map((a) => (
                    <a
                      className={s.linkRow}
                      href={a.href ?? "#"}
                      target={a.href != null ? "_blank" : void 0}
                      rel="noreferrer"
                      onClick={(l) => {
                        a.href == null && l.preventDefault();
                      }}
                      key={a.id}
                    >
                      {<span className={s.linkMeta}>{W(a.date)}</span>}
                      {
                        <span>
                          {<span className={s.linkTitle}>{a.title}</span>}
                          {<span className={s.linkBlurb}>{a.blurb}</span>}
                        </span>
                      }
                      {
                        <span className={s.linkMeta}>
                          {a.minutes}
                          {"m"}
                        </span>
                      }
                    </a>
                  ))}
                </div>
              }
            </e.Fragment>
          )}
          {c.kind === "page" && c.id === "contact" && (
            <e.Fragment>
              {e.jsx(d, {
                text: "cat contact.txt",
                first: !0,
              })}
              {
                <div className={s.out}>
                  {
                    <p
                      className={s.who}
                      style={{
                        fontSize: "1.2rem",
                      }}
                    >
                      {i.signoff}
                    </p>
                  }
                  {
                    <div
                      className={s.kv}
                      style={{
                        marginTop: 22,
                      }}
                    >
                      {<span className={s.kvKey}>{"email"}</span>}
                      {
                        <span className={s.kvVal}>
                          {<a href={`mailto:${i.email}`}>{i.email}</a>}
                        </span>
                      }
                      {i.socials.map((a) => (
                        <v.Fragment key={a.label}>
                          {
                            <span className={s.kvKey}>
                              {a.label.toLowerCase()}
                            </span>
                          }
                          {
                            <span className={s.kvVal}>
                              {
                                <a
                                  href={a.href}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  {a.handle}
                                </a>
                              }
                            </span>
                          }
                        </v.Fragment>
                      ))}
                    </div>
                  }
                </div>
              }
              {e.jsx(d, {
                text: "cat notes.txt",
              })}
              {
                <div className={s.out}>
                  {i.marginalia.slice(0, 2).map((a) => (
                    <p className={s.pageNote} key={a}>
                      {"# "}
                      {a}
                    </p>
                  ))}
                </div>
              }
            </e.Fragment>
          )}
        </div>
      }
      {b && (
        <div className={s.paletteWrap}>
          {
            <button
              type="button"
              className={s.paletteBackdrop}
              aria-label="Close command palette"
              onClick={() => N(!1)}
            />
          }
          {
            <div
              className={s.palette}
              role="dialog"
              aria-modal="true"
              aria-label="Command palette"
            >
              {
                <input
                  ref={R}
                  className={s.paletteInput}
                  value={q}
                  placeholder="jump to a record or page..."
                  onChange={(a) => {
                    y(a.target.value), g(0);
                  }}
                />
              }
              {
                <div className={s.paletteList}>
                  {k.length === 0 && (
                    <div className={s.paletteEmpty}>{"no matches"}</div>
                  )}
                  {k.map((a, l) => (
                    <button
                      type="button"
                      className={[
                        s.paletteItem,
                        l === C ? s.paletteItemActive : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      onMouseEnter={() => g(l)}
                      onClick={() => {
                        a.run(), N(!1);
                      }}
                      key={`${a.kind}-${a.id}`}
                    >
                      {<span className={s.paletteKind}>{a.kind}</span>}
                      {<span>{a.label}</span>}
                      {a.meta !== "" && (
                        <span className={s.paletteMeta}>{a.meta}</span>
                      )}
                    </button>
                  ))}
                </div>
              }
              {
                <div className={s.paletteFoot}>
                  {<span>{"↑↓ move"}</span>}
                  {<span>{"↵ open"}</span>}
                  {<span>{"esc close"}</span>}
                </div>
              }
            </div>
          }
        </div>
      )}
    </div>
  );
};
export default Ls;
