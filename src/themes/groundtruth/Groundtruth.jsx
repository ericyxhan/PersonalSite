import s from "./theme-groundtruth.module.css";
import {
  useRouter as I,
  ReactNamespace as b,
  siteData as i,
  jsx as e,
  pages as R,
  CountUp as y,
  disciplineLabels as v,
  ProjectFigure as w,
  Glyph as S,
  formatDate as L,
  disciplineColors as k,
  parseDateRange as B,
} from "../../App.jsx";
const Ns = ({ roles: n, onPick: t }) => {
    const c = b.useMemo(
      () =>
        n.map((l) => ({
          role: l,
          span: B(l.period),
        })),
      [n],
    );
    if (c.length === 0) return null;
    const r = Math.floor(Math.min(...c.map((l) => l.span[0]))),
      x = Math.ceil(Math.max(...c.map((l) => l.span[1]))),
      a = Math.max(1, x - r),
      o = 132,
      d = 660,
      _ = 20,
      u = c.length * _ + 34,
      h = (l) => o + ((l - r) / a) * (d - o - 24),
      f = Array.from(
        {
          length: x - r + 1,
        },
        (l, p) => r + p,
      ).filter((l) => l % 2 === 0);
    return (
      <div className={s.traverseScroll}>
        {
          <svg
            className={s.traverse}
            viewBox={`0 0 ${d} ${u}`}
            role="img"
            aria-label="Career traverse. Each line is a position; select one to open its record."
          >
            {f.map((l) => (
              <g key={l}>
                {
                  <line
                    className={s.traverseRule}
                    x1={h(l)}
                    x2={h(l)}
                    y1={14}
                    y2={u - 10}
                  />
                }
                {
                  <text
                    className={s.traverseYear}
                    x={h(l)}
                    y={9}
                    textAnchor="middle"
                  >
                    {l}
                  </text>
                }
              </g>
            ))}
            {c.map((l, p) => {
              const j = 22 + p * _,
                g = h(l.span[0]),
                T = Math.max(h(l.span[1]), g + 3);
              return (
                <g
                  className={s.traverseRow}
                  onClick={() => t(l.role.id)}
                  key={l.role.id}
                >
                  {
                    <title>{`${l.role.title}, ${l.role.company} (${l.role.period})`}</title>
                  }
                  {
                    <rect
                      className={s.traverseHit}
                      x={0}
                      y={j - 7}
                      width={d}
                      height={_}
                    />
                  }
                  {
                    <text className={s.traverseLabel} x={0} y={j + 8}>
                      {l.role.company.length > 20
                        ? `${l.role.company.slice(0, 19)}…`
                        : l.role.company}
                    </text>
                  }
                  {
                    <rect
                      className={s.traverseBar}
                      x={g}
                      y={j}
                      width={T - g}
                      height={9}
                      style={
                        l.role.hue != null
                          ? {
                              fill: `hsl(${l.role.hue} var(--bar-s) var(--bar-l))`,
                            }
                          : {
                              fill: k[l.role.discipline],
                            }
                      }
                    />
                  }
                </g>
              );
            })}
          </svg>
        }
      </div>
    );
  },
  N = ({ role: n, onOpen: t, count: c }) => (
    <button type="button" className={s.logRow} onClick={t}>
      {<span className={s.logWhen}>{n.period}</span>}
      {
        <span>
          {
            <span className={s.logTitle}>
              {n.title}{" "}
              {
                <span className={s.logOrg}>
                  {"· "}
                  {n.company}
                </span>
              }
            </span>
          }
          {<span className={s.logSummary}>{n.summary}</span>}
          {c != null && c > 0 && (
            <span className={s.logCount}>
              {c} {c === 1 ? "site" : "sites"}
              {" recorded"}
            </span>
          )}
        </span>
      }
      {
        <span
          className={s.logTag}
          style={{
            "--disc": k[n.discipline],
          }}
        >
          {v[n.discipline]}
        </span>
      }
    </button>
  ),
  m = ({ label: n, children: t }) => (
    <div className={s.siteGrid}>
      {<span className={s.siteLabel}>{n}</span>}
      {<div>{t}</div>}
    </div>
  ),
  ys = () => {
    const n = I(),
      { view: t, setView: c } = n,
      r = b.useMemo(() => {
        const a = new Map();
        return (
          i.projects.forEach((o, d) => {
            a.set(o.id, `S-${String(d + 1).padStart(2, "0")}`);
          }),
          a
        );
      }, []),
      x = t.kind === "index" || t.kind === "role";
    return (
      <div className={s.root} ref={n.scrollRef}>
        {
          <div className={s.sheet}>
            {
              <div className={s.masthead}>
                {
                  <button
                    type="button"
                    className={s.docTitle}
                    onClick={() =>
                      c({
                        kind: "index",
                      })
                    }
                  >
                    {i.name}
                  </button>
                }
                {<span className={s.docMeta}>{i.kicker}</span>}
                {<span className={s.mastheadSpacer} />}
                {<span className={s.docMeta}>{i.location}</span>}
                {<span className={s.docMeta}>{i.availability}</span>}
              </div>
            }
            {
              <nav className={s.index} aria-label="Primary">
                {
                  <button
                    type="button"
                    onClick={() =>
                      c({
                        kind: "index",
                      })
                    }
                    className={[s.indexItem, x ? s.indexItemActive : ""]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    {"Experience"}
                  </button>
                }
                {R.map((a) => (
                  <button
                    type="button"
                    onClick={() =>
                      c({
                        kind: "page",
                        id: a.id,
                      })
                    }
                    className={[
                      s.indexItem,
                      t.kind === "page" && t.id === a.id
                        ? s.indexItemActive
                        : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    key={a.id}
                  >
                    {a.label}
                  </button>
                ))}
              </nav>
            }
            {<div id="content" tabIndex={-1} />}
            {t.kind === "index" && (
              <e.Fragment>
                {
                  <header className={s.lede}>
                    {<h1 className={s.ledeTitle}>{i.headline}</h1>}
                    {<p className={s.ledeBody}>{i.subhead}</p>}
                    {
                      <div className={s.actions}>
                        {
                          <button
                            type="button"
                            className={`${s.btn} ${s.btnFlag}`}
                            onClick={() =>
                              c({
                                kind: "page",
                                id: "work",
                              })
                            }
                          >
                            {"The work"}
                          </button>
                        }
                        {
                          <a className={s.btn} href={`mailto:${i.email}`}>
                            {"Get in touch"}
                          </a>
                        }
                      </div>
                    }
                    {
                      <div
                        className={s.figures}
                        style={{
                          marginTop: 28,
                        }}
                      >
                        {i.headlineMetrics.map((a) => (
                          <div className={s.figureRow} key={a.label}>
                            {<span className={s.figureLabel}>{a.label}</span>}
                            {
                              <span className={s.figureValue}>
                                {e.jsx(y, {
                                  value: a.value,
                                })}
                              </span>
                            }
                          </div>
                        ))}
                      </div>
                    }
                  </header>
                }
                {
                  <section className={s.section}>
                    {
                      <div className={s.sectionHead}>
                        {<h2 className={s.sectionTitle}>{"Experience"}</h2>}
                        {
                          <span className={s.sectionNote}>
                            {n.experience.length}
                            {" entries"}
                          </span>
                        }
                      </div>
                    }
                    {n.experienceGroups.map((a) => (
                      <div className={s.group} key={a.company + a.roles[0].id}>
                        {a.roles.length > 1 && (
                          <div className={s.groupHead}>{a.company}</div>
                        )}
                        {a.roles.map((o) => (
                          <N
                            role={o}
                            count={(n.workByRole.get(o.id) ?? []).length}
                            onOpen={() =>
                              c({
                                kind: "role",
                                id: o.id,
                              })
                            }
                            key={o.id}
                          />
                        ))}
                      </div>
                    ))}
                  </section>
                }
                {n.education.length > 0 && (
                  <section className={s.section}>
                    {
                      <div className={s.sectionHead}>
                        {<h2 className={s.sectionTitle}>{"Education"}</h2>}
                      </div>
                    }
                    {n.education.map((a) => (
                      <N
                        role={a}
                        count={(n.workByRole.get(a.id) ?? []).length}
                        onOpen={() =>
                          c({
                            kind: "role",
                            id: a.id,
                          })
                        }
                        key={a.id}
                      />
                    ))}
                  </section>
                )}
                {n.personal.length > 0 && (
                  <section className={s.section}>
                    {
                      <div className={s.sectionHead}>
                        {<h2 className={s.sectionTitle}>{"Alongside"}</h2>}
                      </div>
                    }
                    {n.personal.map((a) => (
                      <N
                        role={a}
                        count={(n.workByRole.get(a.id) ?? []).length}
                        onOpen={() =>
                          c({
                            kind: "role",
                            id: a.id,
                          })
                        }
                        key={a.id}
                      />
                    ))}
                  </section>
                )}
                {
                  <section className={s.section}>
                    {
                      <div className={s.sectionHead}>
                        {<h2 className={s.sectionTitle}>{"Traverse"}</h2>}
                        {
                          <span className={s.sectionNote}>
                            {i.roles.length}
                            {" positions"}
                          </span>
                        }
                      </div>
                    }
                    {
                      <Ns
                        roles={i.roles}
                        onPick={(a) =>
                          c({
                            kind: "role",
                            id: a,
                          })
                        }
                      />
                    }
                  </section>
                }
              </e.Fragment>
            )}
            {t.kind === "role" && n.role != null && (
              <e.Fragment>
                {
                  <button
                    type="button"
                    className={s.back}
                    onClick={() =>
                      c({
                        kind: "index",
                      })
                    }
                  >
                    {"← All experience"}
                  </button>
                }
                {
                  <header className={s.recordHead}>
                    {<div className={s.recordKicker}>{n.role.company}</div>}
                    {<h1 className={s.recordTitle}>{n.role.title}</h1>}
                    {
                      <div className={s.recordMeta}>
                        {<span>{n.role.period}</span>}
                        {<span>{v[n.role.discipline]}</span>}
                      </div>
                    }
                    {<p className={s.recordSummary}>{n.role.summary}</p>}
                  </header>
                }
                {n.role.highlights.length > 0 && (
                  <section className={s.section}>
                    {
                      <div className={s.sectionHead}>
                        {<h2 className={s.sectionTitle}>{"Work performed"}</h2>}
                      </div>
                    }
                    {
                      <ul className={s.bullets}>
                        {n.role.highlights.map((a) => (
                          <li key={a}>{a}</li>
                        ))}
                      </ul>
                    }
                  </section>
                )}
                {n.role.companyId != null &&
                  n.companyById.get(n.role.companyId) != null && (
                    <section className={s.section}>
                      {
                        <div className={s.sectionHead}>
                          {
                            <h2 className={s.sectionTitle}>
                              {"About "}
                              {n.companyById.get(n.role.companyId)?.name}
                            </h2>
                          }
                        </div>
                      }
                      {
                        <p className={s.siteText}>
                          {n.companyById.get(n.role.companyId)?.blurb}
                        </p>
                      }
                      {
                        <div className={s.tags}>
                          {(
                            n.companyById.get(n.role.companyId)?.facts ?? []
                          ).map((a) => (
                            <span className={s.tag} key={a}>
                              {a}
                            </span>
                          ))}
                        </div>
                      }
                    </section>
                  )}
                {(n.workByRole.get(n.role.id) ?? []).length > 0 && (
                  <section className={s.section}>
                    {
                      <div className={s.sectionHead}>
                        {
                          <h2 className={s.sectionTitle}>
                            {"Sites recorded here"}
                          </h2>
                        }
                        {
                          <span className={s.sectionNote}>
                            {(n.workByRole.get(n.role.id) ?? []).length}
                          </span>
                        }
                      </div>
                    }
                    {(n.workByRole.get(n.role.id) ?? []).map((a) => (
                      <button
                        type="button"
                        className={[s.entry, s.entryPlain].join(" ")}
                        onClick={() =>
                          c({
                            kind: "project",
                            id: a.id,
                          })
                        }
                        key={a.id}
                      >
                        {<span className={s.entryId}>{r.get(a.id)}</span>}
                        {
                          <span>
                            {<span className={s.entryTitle}>{a.name}</span>}
                            {
                              <span className={s.entrySummary}>
                                {a.tagline}
                              </span>
                            }
                          </span>
                        }
                        {<span className={s.entryArrow}>{"→"}</span>}
                      </button>
                    ))}
                  </section>
                )}
                {
                  <div className={s.pager}>
                    {n.roleIndex > 0 ? (
                      <button
                        type="button"
                        className={s.pagerBtn}
                        onClick={() =>
                          c({
                            kind: "role",
                            id: n.siblings[n.roleIndex - 1].id,
                          })
                        }
                      >
                        {
                          <span className={s.pagerLabel}>
                            {"← More recent"}
                          </span>
                        }
                        {
                          <span className={s.pagerName}>
                            {n.siblings[n.roleIndex - 1].company}
                          </span>
                        }
                      </button>
                    ) : (
                      <span />
                    )}
                    {n.roleIndex >= 0 &&
                      n.roleIndex < n.siblings.length - 1 && (
                        <button
                          type="button"
                          className={s.pagerBtn}
                          style={{
                            textAlign: "right",
                          }}
                          onClick={() =>
                            c({
                              kind: "role",
                              id: n.siblings[n.roleIndex + 1].id,
                            })
                          }
                        >
                          {<span className={s.pagerLabel}>{"Earlier →"}</span>}
                          {
                            <span className={s.pagerName}>
                              {n.siblings[n.roleIndex + 1].company}
                            </span>
                          }
                        </button>
                      )}
                  </div>
                }
              </e.Fragment>
            )}
            {t.kind === "project" && n.project != null && (
              <div
                style={{
                  "--project-h": String(n.project.hue),
                }}
              >
                {
                  <button
                    type="button"
                    className={s.back}
                    onClick={() =>
                      c({
                        kind: "page",
                        id: "work",
                      })
                    }
                  >
                    {"← All work"}
                  </button>
                }
                {
                  <header className={s.recordHead}>
                    {
                      <div className={s.recordKicker}>
                        {
                          <span className={s.recordId}>
                            {r.get(n.project.id)}
                          </span>
                        }
                        {n.parentRole != null
                          ? n.parentRole.company
                          : "Personal project"}
                      </div>
                    }
                    {<h1 className={s.recordTitle}>{n.project.name}</h1>}
                    {
                      <div className={s.recordMeta}>
                        {<span>{n.project.period}</span>}
                        {<span>{n.project.role}</span>}
                      </div>
                    }
                    {<p className={s.recordSummary}>{n.project.tagline}</p>}
                  </header>
                }
                {n.client != null &&
                  e.jsxs(m, {
                    label: `About ${n.client.name}`,
                    children: [
                      <p className={s.siteText}>{n.client.blurb}</p>,
                      <div className={s.tags}>
                        {(n.client.facts ?? []).map((a) => (
                          <span className={s.tag} key={a}>
                            {a}
                          </span>
                        ))}
                      </div>,
                    ],
                  })}
                {n.project.situation != null &&
                  e.jsx(m, {
                    label: "Conditions",
                    children: (
                      <p className={s.siteText}>{n.project.situation}</p>
                    ),
                  })}
                {n.project.constraint != null &&
                  e.jsx(m, {
                    label: "Difficulty",
                    children: (
                      <p className={s.siteText}>{n.project.constraint}</p>
                    ),
                  })}
                {e.jsxs(m, {
                  label: "Method",
                  children: [
                    <p className={s.siteText}>{n.project.body}</p>,
                    <div className={s.tags}>
                      {n.project.stack.map((a) => (
                        <span className={s.tag} key={a}>
                          {a}
                        </span>
                      ))}
                    </div>,
                    n.project.href != null && (
                      <a
                        className={s.link}
                        href={n.project.href}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {"Read more"}
                      </a>
                    ),
                  ],
                })}
                {(n.project.components ?? []).length > 0 &&
                  e.jsx(m, {
                    label: "Apparatus",
                    children: (n.project.components ?? []).map((a, o) => (
                      <div className={s.component} key={a.name}>
                        {
                          <span className={s.componentRank}>
                            {String(o + 1).padStart(2, "0")}
                          </span>
                        }
                        {
                          <span>
                            {<span className={s.componentName}>{a.name}</span>}
                            {<span className={s.componentNote}>{a.note}</span>}
                          </span>
                        }
                      </div>
                    )),
                  })}
                {e.jsx(w, {
                  visual: n.project.visual,
                })}
                {(n.project.learned ?? []).length > 0 &&
                  e.jsx(m, {
                    label: "Field notes",
                    children: (n.project.learned ?? []).map((a) => (
                      <p className={s.learnedItem} key={a.slice(0, 40)}>
                        {a}
                      </p>
                    )),
                  })}
                {n.project.metrics.length > 0 &&
                  e.jsx(m, {
                    label: "Readings",
                    children: (
                      <div className={s.readings}>
                        {n.project.metrics.map((a) => (
                          <div key={a.label}>
                            {
                              <div className={s.readingValue}>
                                {e.jsx(y, {
                                  value: a.value,
                                })}
                              </div>
                            }
                            {<div className={s.readingLabel}>{a.label}</div>}
                          </div>
                        ))}
                      </div>
                    ),
                  })}
                {n.project.demo != null && (
                  <div className={s.demo}>
                    {
                      <div className={s.demoHead}>
                        {<span>{n.project.demo.label}</span>}
                        {
                          <span className={s.demoStatus}>
                            {n.project.demo.status === "live"
                              ? "Available"
                              : "In progress"}
                          </span>
                        }
                      </div>
                    }
                    {<p className={s.demoNote}>{n.project.demo.note}</p>}
                  </div>
                )}
                {n.parentRole != null && (
                  <div className={s.pager}>
                    {
                      <button
                        type="button"
                        className={s.pagerBtn}
                        onClick={() =>
                          c({
                            kind: "role",
                            id: n.parentRole?.id ?? "",
                          })
                        }
                      >
                        {
                          <span className={s.pagerLabel}>
                            {"Recorded during"}
                          </span>
                        }
                        {
                          <span className={s.pagerName}>
                            {n.parentRole.title}
                            {" · "}
                            {n.parentRole.company}
                          </span>
                        }
                      </button>
                    }
                  </div>
                )}
              </div>
            )}
            {t.kind === "page" && t.id === "work" && (
              <e.Fragment>
                {
                  <header className={s.lede}>
                    {<h1 className={s.ledeTitle}>{"Selected work"}</h1>}
                    {
                      <p className={s.ledeBody}>
                        {
                          "The same work the log covers, indexed by the thing built rather than by who it was built for. Every site opens its full record."
                        }
                      </p>
                    }
                  </header>
                }
                {
                  <section className={s.section}>
                    {
                      <div className={s.sectionHead}>
                        {<h2 className={s.sectionTitle}>{"Sites"}</h2>}
                        {
                          <span className={s.sectionNote}>
                            {i.projects.length}
                          </span>
                        }
                      </div>
                    }
                    {i.projects.map((a) => {
                      const o = i.roles.find((d) => d.id === a.roleId);
                      return (
                        <button
                          type="button"
                          className={s.entry}
                          style={{
                            "--project-h": String(a.hue),
                          }}
                          onClick={() =>
                            c({
                              kind: "project",
                              id: a.id,
                            })
                          }
                          key={a.id}
                        >
                          {<span className={s.entryId}>{r.get(a.id)}</span>}
                          {
                            <span>
                              {<span className={s.entryTitle}>{a.name}</span>}
                              {
                                <span className={s.entrySummary}>
                                  {a.tagline}
                                </span>
                              }
                              {
                                <span className={s.entryOrg}>
                                  {o != null ? o.company : "Personal"}
                                  {" · "}
                                  {a.period}
                                </span>
                              }
                            </span>
                          }
                          {
                            <span className={s.entryGlyph}>
                              {<S kind={a.id} />}
                            </span>
                          }
                          {<span className={s.entryArrow}>{"→"}</span>}
                        </button>
                      );
                    })}
                  </section>
                }
              </e.Fragment>
            )}
            {t.kind === "page" && t.id === "about" && (
              <e.Fragment>
                {
                  <header className={s.lede}>
                    {<h1 className={s.ledeTitle}>{"Background"}</h1>}
                  </header>
                }
                {
                  <section className={s.section}>
                    {
                      <div className={s.prose}>
                        {
                          <div className={s.proseBody}>
                            {i.about.map((a, o) => (
                              <p key={o}>{a}</p>
                            ))}
                          </div>
                        }
                        {
                          <div>
                            {i.marginalia.slice(0, 3).map((a) => (
                              <p className={s.marginNote} key={a}>
                                {
                                  <span className={s.marginLabel}>
                                    {"Note"}
                                  </span>
                                }
                                {a}
                              </p>
                            ))}
                            {
                              <div className={s.figures}>
                                {
                                  <div className={s.figureRow}>
                                    {
                                      <span className={s.figureLabel}>
                                        {"Industries"}
                                      </span>
                                    }
                                    {
                                      <span className={s.linkMeta}>
                                        {i.industries.length}
                                      </span>
                                    }
                                  </div>
                                }
                                {i.industries.map((a) => (
                                  <div className={s.figureRow} key={a}>
                                    {<span className={s.figureLabel}>{a}</span>}
                                    {<span className={s.linkMeta}>{"✓"}</span>}
                                  </div>
                                ))}
                              </div>
                            }
                          </div>
                        }
                      </div>
                    }
                  </section>
                }
                {
                  <section className={s.section}>
                    {
                      <div className={s.sectionHead}>
                        {<h2 className={s.sectionTitle}>{"Instruments"}</h2>}
                      </div>
                    }
                    {
                      <div className={s.cols}>
                        {i.skills.map((a) => (
                          <div key={a.label}>
                            {<div className={s.colHead}>{a.label}</div>}
                            {
                              <ul className={s.colList}>
                                {a.items.map((o) => (
                                  <li key={o}>{o}</li>
                                ))}
                              </ul>
                            }
                          </div>
                        ))}
                      </div>
                    }
                  </section>
                }
                {
                  <section className={s.section}>
                    {
                      <div className={s.sectionHead}>
                        {<h2 className={s.sectionTitle}>{"Odds and ends"}</h2>}
                      </div>
                    }
                    {
                      <div className={s.figures}>
                        {i.stats.map((a) => (
                          <div className={s.figureRow} key={a.label}>
                            {<span className={s.figureLabel}>{a.label}</span>}
                            {<span className={s.figureValue}>{a.value}</span>}
                          </div>
                        ))}
                      </div>
                    }
                  </section>
                }
              </e.Fragment>
            )}
            {t.kind === "page" && t.id === "writing" && (
              <e.Fragment>
                {
                  <header className={s.lede}>
                    {
                      <h1 className={s.ledeTitle}>
                        {"Publications and talks"}
                      </h1>
                    }
                  </header>
                }
                {
                  <section className={s.section}>
                    {
                      <div className={s.sectionHead}>
                        {<h2 className={s.sectionTitle}>{"Record"}</h2>}
                        {
                          <span className={s.sectionNote}>
                            {i.posts.length}
                          </span>
                        }
                      </div>
                    }
                    {i.posts.map((a) => (
                      <a
                        className={s.linkRow}
                        href={a.href ?? "#"}
                        target={a.href != null ? "_blank" : void 0}
                        rel="noreferrer"
                        onClick={(o) => {
                          a.href == null && o.preventDefault();
                        }}
                        key={a.id}
                      >
                        {<span className={s.linkMeta}>{L(a.date)}</span>}
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
                  </section>
                }
              </e.Fragment>
            )}
            {t.kind === "page" && t.id === "contact" && (
              <section className={s.closing}>
                {
                  <div className={s.sectionHead}>
                    {<h2 className={s.sectionTitle}>{"Contact"}</h2>}
                  </div>
                }
                {<p className={s.signoff}>{i.signoff}</p>}
                {
                  <div className={s.contactRow}>
                    {<span className={s.contactKey}>{"Email"}</span>}
                    {<a href={`mailto:${i.email}`}>{i.email}</a>}
                  </div>
                }
                {i.socials.map((a) => (
                  <div className={s.contactRow} key={a.label}>
                    {<span className={s.contactKey}>{a.label}</span>}
                    {
                      <a href={a.href} target="_blank" rel="noreferrer">
                        {a.handle}
                      </a>
                    }
                  </div>
                ))}
                {i.marginalia.slice(0, 2).map((a) => (
                  <p className={s.marginNote} key={a}>
                    {<span className={s.marginLabel}>{"Note"}</span>}
                    {a}
                  </p>
                ))}
                {
                  <div className={s.colophon}>
                    {
                      <span>
                        {i.name}
                        {" · "}
                        {new Date().getFullYear()}
                      </span>
                    }
                    {<span>{i.location}</span>}
                  </div>
                }
              </section>
            )}
          </div>
        }
      </div>
    );
  };
export default ys;
