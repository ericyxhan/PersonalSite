import s from "./theme-stark.module.css";
import {
  useRouter as L,
  ReactNamespace as g,
  siteData as i,
  jsx as e,
  pages as T,
  CountUp as w,
  disciplineLabels as y,
  ProjectFigure as I,
  Glyph as S,
  formatDate as B,
  parseDateRange as H,
} from "../../App.jsx";
const r = ({ tone: a, className: l, children: t }) => (
    <section
      data-tone={a}
      className={[s.band, a === "inverse" ? s.inverse : s.base, l]
        .filter(Boolean)
        .join(" ")}
    >
      {<div className={s.inner}>{t}</div>}
    </section>
  ),
  d = ({ title: a, note: l }) => (
    <div className={s.bandHead}>
      {<h2 className={s.bandTitle}>{a}</h2>}
      {l != null && <span className={s.bandNote}>{l}</span>}
    </div>
  );
function Ns(a, l) {
  const [t, j] = g.useState("base");
  return (
    g.useEffect(() => {
      const m = a.current;
      if (m == null) return;
      j("base");
      const x = Array.from(m.querySelectorAll("[data-tone]")),
        n = new IntersectionObserver(
          (o) => {
            for (const h of o)
              h.isIntersecting &&
                j(
                  h.target.getAttribute("data-tone") === "inverse"
                    ? "inverse"
                    : "base",
                );
          },
          {
            root: m,
            rootMargin: "-46px 0px -100% 0px",
            threshold: 0,
          },
        );
      return x.forEach((o) => n.observe(o)), () => n.disconnect();
    }, [a, l]),
    t
  );
}
const bs = ({ roles: a, onPick: l }) => {
    const t = g.useMemo(
      () =>
        a.map((c) => ({
          role: c,
          span: H(c.period),
        })),
      [a],
    );
    if (t.length === 0) return null;
    const j = Math.floor(Math.min(...t.map((c) => c.span[0]))),
      m = Math.ceil(Math.max(...t.map((c) => c.span[1]))),
      x = Math.max(1, m - j),
      n = 150,
      o = 720,
      h = 26,
      v = t.length * h + 40,
      p = (c) => n + ((c - j) / x) * (o - n - 20),
      R = Array.from(
        {
          length: m - j + 1,
        },
        (c, u) => j + u,
      ).filter((c) => c % 2 === 0);
    return (
      <div className={s.timelineScroll}>
        {
          <svg
            className={s.timeline}
            viewBox={`0 0 ${o} ${v}`}
            role="img"
            aria-label="Career timeline. Each bar is a position; select one to open it."
          >
            {R.map((c) => (
              <g key={c}>
                {
                  <line
                    className={s.timelineRule}
                    x1={p(c)}
                    x2={p(c)}
                    y1={18}
                    y2={v - 12}
                  />
                }
                {
                  <text
                    className={s.timelineYear}
                    x={p(c)}
                    y={11}
                    textAnchor="middle"
                  >
                    {c}
                  </text>
                }
              </g>
            ))}
            {t.map((c, u) => {
              const N = 26 + u * h,
                b = p(c.span[0]),
                f = Math.max(p(c.span[1]), b + 4);
              return (
                <g
                  className={s.timelineRow}
                  onClick={() => l(c.role.id)}
                  key={c.role.id}
                >
                  {
                    <title>{`${c.role.title}, ${c.role.company} (${c.role.period})`}</title>
                  }
                  {
                    <rect
                      className={s.timelineHit}
                      x={0}
                      y={N - 9}
                      width={o}
                      height={h}
                    />
                  }
                  {
                    <text className={s.timelineLabel} x={0} y={N + 9}>
                      {c.role.company.length > 22
                        ? `${c.role.company.slice(0, 21)}…`
                        : c.role.company}
                    </text>
                  }
                  {
                    <rect
                      className={s.timelineBar}
                      x={b}
                      y={N}
                      width={f - b}
                      height={12}
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
  k = ({ role: a, count: l, onOpen: t }) => (
    <button type="button" className={s.row} onClick={t}>
      {<span className={s.rowWhen}>{a.period}</span>}
      {
        <span>
          {
            <span className={s.rowTitle}>
              {a.title}
              {" · "}
              {a.company}
            </span>
          }
          {<span className={s.rowSummary}>{a.summary}</span>}
          {l > 0 && (
            <span className={s.rowCount}>
              {l} {l === 1 ? "case" : "cases"}
            </span>
          )}
        </span>
      }
      {<span className={s.rowTag}>{y[a.discipline]}</span>}
    </button>
  ),
  _ = ({ label: a, children: l }) => (
    <div className={s.caseGrid}>
      {<span className={s.caseLabel}>{a}</span>}
      {<div>{l}</div>}
    </div>
  ),
  vs = () => {
    const a = L(),
      { view: l, setView: t } = a,
      j = Ns(a.scrollRef, l),
      m = g.useMemo(() => {
        const n = new Map();
        return (
          i.projects.forEach((o, h) => {
            n.set(o.id, String(h + 1).padStart(2, "0"));
          }),
          n
        );
      }, []),
      x = l.kind === "index" || l.kind === "role";
    return (
      <div className={s.root} ref={a.scrollRef}>
        {
          <div
            className={[s.hud, j === "inverse" ? s.hudOnInverse : ""]
              .filter(Boolean)
              .join(" ")}
          >
            {
              <button
                type="button"
                className={s.hudName}
                onClick={() =>
                  t({
                    kind: "index",
                  })
                }
              >
                {i.name}
              </button>
            }
            {<span className={s.hudMeta}>{i.kicker}</span>}
            {<span className={s.hudSpacer} />}
            {
              <nav className={s.hudNav} aria-label="Sections">
                {
                  <button
                    type="button"
                    onClick={() =>
                      t({
                        kind: "index",
                      })
                    }
                    className={[s.hudLink, x ? s.hudLinkActive : ""]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    {"Experience"}
                  </button>
                }
                {T.map((n) => (
                  <button
                    type="button"
                    onClick={() =>
                      t({
                        kind: "page",
                        id: n.id,
                      })
                    }
                    className={[
                      s.hudLink,
                      l.kind === "page" && l.id === n.id ? s.hudLinkActive : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    key={n.id}
                  >
                    {n.label}
                  </button>
                ))}
              </nav>
            }
          </div>
        }
        {<div id="content" tabIndex={-1} />}
        {l.kind === "index" && (
          <e.Fragment>
            {e.jsxs(r, {
              tone: "base",
              className: s.hero,
              children: [
                <div className={s.kicker}>
                  {i.location}
                  {" · "}
                  {i.availability}
                </div>,
                <h1 className={s.heroTitle}>{i.headline}</h1>,
                <p className={s.heroSub}>{i.subhead}</p>,
                <div className={s.heroRule} />,
                <div className={s.figures}>
                  {i.headlineMetrics.map((n) => (
                    <div className={s.figure} key={n.label}>
                      {
                        <div className={s.figureValue}>
                          {e.jsx(w, {
                            value: n.value,
                          })}
                        </div>
                      }
                      {<div className={s.figureLabel}>{n.label}</div>}
                    </div>
                  ))}
                </div>,
                <div className={s.sectors}>
                  {i.industries.map((n) => (
                    <span className={s.sectorItem} key={n}>
                      {n}
                    </span>
                  ))}
                </div>,
                <div className={s.actions}>
                  {
                    <button
                      type="button"
                      className={`${s.btn} ${s.btnFilled}`}
                      onClick={() =>
                        t({
                          kind: "page",
                          id: "work",
                        })
                      }
                    >
                      {<span>{"See the work"}</span>}
                    </button>
                  }
                  {
                    <a className={s.btn} href={`mailto:${i.email}`}>
                      {"Get in touch"}
                    </a>
                  }
                </div>,
              ],
            })}
            {e.jsxs(r, {
              tone: "inverse",
              children: [
                e.jsx(d, {
                  title: "Where I have been",
                  note: `${a.experience.length} positions`,
                }),
                a.experienceGroups.map((n) => (
                  <div key={n.company + n.roles[0].id}>
                    {n.roles.length > 1 && (
                      <div className={s.groupHead}>{n.company}</div>
                    )}
                    {n.roles.map((o) =>
                      e.jsx(
                        k,
                        {
                          role: o,
                          count: (a.workByRole.get(o.id) ?? []).length,
                          onOpen: () =>
                            t({
                              kind: "role",
                              id: o.id,
                            }),
                        },
                        o.id,
                      ),
                    )}
                  </div>
                )),
              ],
            })}
            {a.education.length > 0 &&
              e.jsxs(r, {
                tone: "base",
                children: [
                  e.jsx(d, {
                    title: "Education",
                  }),
                  a.education.map((n) =>
                    e.jsx(
                      k,
                      {
                        role: n,
                        count: (a.workByRole.get(n.id) ?? []).length,
                        onOpen: () =>
                          t({
                            kind: "role",
                            id: n.id,
                          }),
                      },
                      n.id,
                    ),
                  ),
                ],
              })}
            {a.personal.length > 0 &&
              e.jsxs(r, {
                tone: "inverse",
                children: [
                  e.jsx(d, {
                    title: "Alongside",
                  }),
                  a.personal.map((n) =>
                    e.jsx(
                      k,
                      {
                        role: n,
                        count: (a.workByRole.get(n.id) ?? []).length,
                        onOpen: () =>
                          t({
                            kind: "role",
                            id: n.id,
                          }),
                      },
                      n.id,
                    ),
                  ),
                ],
              })}
            {e.jsxs(r, {
              tone: a.personal.length > 0 ? "base" : "inverse",
              children: [
                e.jsx(d, {
                  title: "The shape of it",
                  note: `${i.roles.length} in total`,
                }),
                e.jsx(bs, {
                  roles: i.roles,
                  onPick: (n) =>
                    t({
                      kind: "role",
                      id: n,
                    }),
                }),
              ],
            })}
          </e.Fragment>
        )}
        {l.kind === "role" && a.role != null && (
          <e.Fragment>
            {e.jsxs(r, {
              tone: "base",
              children: [
                <button
                  type="button"
                  className={s.back}
                  onClick={() =>
                    t({
                      kind: "index",
                    })
                  }
                >
                  {"← All experience"}
                </button>,
                <div className={s.kicker}>{a.role.company}</div>,
                <h1 className={s.recTitle}>{a.role.title}</h1>,
                <div className={s.recMeta}>
                  {<span>{a.role.period}</span>}
                  {<span>{y[a.role.discipline]}</span>}
                </div>,
                <p className={s.recSummary}>{a.role.summary}</p>,
              ],
            })}
            {a.role.highlights.length > 0 &&
              e.jsxs(r, {
                tone: "inverse",
                children: [
                  e.jsx(d, {
                    title: "What I did there",
                  }),
                  <ul className={s.bullets}>
                    {a.role.highlights.map((n) => (
                      <li key={n}>{n}</li>
                    ))}
                  </ul>,
                ],
              })}
            {a.role.companyId != null &&
              a.companyById.get(a.role.companyId) != null &&
              e.jsxs(r, {
                tone: "base",
                children: [
                  e.jsx(d, {
                    title: `About ${a.companyById.get(a.role.companyId)?.name}`,
                  }),
                  <p className={s.caseText}>
                    {a.companyById.get(a.role.companyId)?.blurb}
                  </p>,
                  <div className={s.tags}>
                    {(a.companyById.get(a.role.companyId)?.facts ?? []).map(
                      (n) => (
                        <span className={s.tag} key={n}>
                          {n}
                        </span>
                      ),
                    )}
                  </div>,
                ],
              })}
            {(a.workByRole.get(a.role.id) ?? []).length > 0 &&
              e.jsxs(r, {
                tone: "inverse",
                children: [
                  e.jsx(d, {
                    title: "Built here",
                    note: `${(a.workByRole.get(a.role.id) ?? []).length} cases`,
                  }),
                  (a.workByRole.get(a.role.id) ?? []).map((n) => (
                    <button
                      type="button"
                      className={[s.caseRow, s.caseRowPlain].join(" ")}
                      onClick={() =>
                        t({
                          kind: "project",
                          id: n.id,
                        })
                      }
                      key={n.id}
                    >
                      {<span className={s.caseRowNo}>{m.get(n.id)}</span>}
                      {
                        <span>
                          {<span className={s.caseRowName}>{n.name}</span>}
                          {<span className={s.caseRowLine}>{n.tagline}</span>}
                        </span>
                      }
                      {<span className={s.caseRowArrow}>{"→"}</span>}
                    </button>
                  )),
                ],
              })}
            {e.jsx(r, {
              tone: "base",
              children: (
                <div className={s.pager}>
                  {a.roleIndex > 0 ? (
                    <button
                      type="button"
                      className={s.pagerBtn}
                      onClick={() =>
                        t({
                          kind: "role",
                          id: a.siblings[a.roleIndex - 1].id,
                        })
                      }
                    >
                      {<span className={s.pagerLabel}>{"← More recent"}</span>}
                      {
                        <span className={s.pagerName}>
                          {a.siblings[a.roleIndex - 1].company}
                        </span>
                      }
                    </button>
                  ) : (
                    <span />
                  )}
                  {a.roleIndex >= 0 && a.roleIndex < a.siblings.length - 1 && (
                    <button
                      type="button"
                      className={s.pagerBtn}
                      style={{
                        textAlign: "right",
                      }}
                      onClick={() =>
                        t({
                          kind: "role",
                          id: a.siblings[a.roleIndex + 1].id,
                        })
                      }
                    >
                      {<span className={s.pagerLabel}>{"Earlier →"}</span>}
                      {
                        <span className={s.pagerName}>
                          {a.siblings[a.roleIndex + 1].company}
                        </span>
                      }
                    </button>
                  )}
                </div>
              ),
            })}
          </e.Fragment>
        )}
        {l.kind === "project" && a.project != null && (
          <e.Fragment>
            {e.jsxs(r, {
              tone: "base",
              children: [
                <button
                  type="button"
                  className={s.back}
                  onClick={() =>
                    t({
                      kind: "page",
                      id: "work",
                    })
                  }
                >
                  {"← All work"}
                </button>,
                <div className={s.caseHead}>
                  {<span className={s.caseNo}>{m.get(a.project.id)}</span>}
                  {a.project.featured === !0 && (
                    <span className={s.caseFlag}>{"Flagship"}</span>
                  )}
                  {
                    <span className={s.kicker}>
                      {a.parentRole != null
                        ? a.parentRole.company
                        : "Personal project"}
                    </span>
                  }
                </div>,
                <h1 className={s.recTitle}>{a.project.name}</h1>,
                <div className={s.recMeta}>
                  {<span>{a.project.period}</span>}
                  {<span>{a.project.role}</span>}
                </div>,
                <p className={s.recSummary}>{a.project.tagline}</p>,
              ],
            })}
            {e.jsxs(r, {
              tone: "inverse",
              children: [
                a.client != null &&
                  e.jsxs(_, {
                    label: `About ${a.client.name}`,
                    children: [
                      <p className={s.caseText}>{a.client.blurb}</p>,
                      <div className={s.tags}>
                        {(a.client.facts ?? []).map((n) => (
                          <span className={s.tag} key={n}>
                            {n}
                          </span>
                        ))}
                      </div>,
                    ],
                  }),
                a.project.situation != null &&
                  e.jsx(_, {
                    label: "Situation",
                    children: (
                      <p className={`${s.caseText} ${s.caseTextLead}`}>
                        {a.project.situation}
                      </p>
                    ),
                  }),
                a.project.constraint != null &&
                  e.jsx(_, {
                    label: "Constraint",
                    children: (
                      <p className={s.caseText}>{a.project.constraint}</p>
                    ),
                  }),
              ],
            })}
            {e.jsxs(r, {
              tone: "base",
              children: [
                e.jsxs(_, {
                  label: "What I built",
                  children: [
                    <p className={s.caseText}>{a.project.body}</p>,
                    <div className={s.tags}>
                      {a.project.stack.map((n) => (
                        <span className={s.tag} key={n}>
                          {n}
                        </span>
                      ))}
                    </div>,
                    a.project.href != null && (
                      <a
                        className={s.link}
                        href={a.project.href}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {"Read more"}
                      </a>
                    ),
                  ],
                }),
                (a.project.components ?? []).length > 0 &&
                  e.jsx(_, {
                    label: "Parts",
                    children: (a.project.components ?? []).map((n, o) => (
                      <div className={s.component} key={n.name}>
                        {
                          <span className={s.componentRank}>
                            {String(o + 1).padStart(2, "0")}
                          </span>
                        }
                        {
                          <span>
                            {<span className={s.componentName}>{n.name}</span>}
                            {<span className={s.componentNote}>{n.note}</span>}
                          </span>
                        }
                      </div>
                    )),
                  }),
                <I visual={a.project.visual} />,
              ],
            })}
            {(a.project.learned ?? []).length > 0 &&
              e.jsxs(r, {
                tone: "inverse",
                children: [
                  e.jsx(d, {
                    title: "What it taught me",
                  }),
                  (a.project.learned ?? []).map((n) => (
                    <p className={s.learnedItem} key={n.slice(0, 40)}>
                      {n}
                    </p>
                  )),
                ],
              })}
            {e.jsxs(r, {
              tone: "base",
              children: [
                a.project.metrics.length > 0 &&
                  e.jsx(_, {
                    label: "Outcome",
                    children: (
                      <div className={s.outcomes}>
                        {a.project.metrics.map((n) => (
                          <div key={n.label}>
                            {
                              <div className={s.outcomeValue}>
                                {e.jsx(w, {
                                  value: n.value,
                                })}
                              </div>
                            }
                            {<div className={s.outcomeLabel}>{n.label}</div>}
                          </div>
                        ))}
                      </div>
                    ),
                  }),
                a.project.demo != null && (
                  <div className={s.demo}>
                    {
                      <div className={s.demoHead}>
                        {<span>{a.project.demo.label}</span>}
                        {
                          <span className={s.demoStatus}>
                            {a.project.demo.status === "live"
                              ? "Available"
                              : "In progress"}
                          </span>
                        }
                      </div>
                    }
                    {<p className={s.demoNote}>{a.project.demo.note}</p>}
                  </div>
                ),
                a.parentRole != null && (
                  <div className={s.pager}>
                    {
                      <button
                        type="button"
                        className={s.pagerBtn}
                        onClick={() =>
                          t({
                            kind: "role",
                            id: a.parentRole?.id ?? "",
                          })
                        }
                      >
                        {<span className={s.pagerLabel}>{"Built during"}</span>}
                        {
                          <span className={s.pagerName}>
                            {a.parentRole.title}
                            {" · "}
                            {a.parentRole.company}
                          </span>
                        }
                      </button>
                    }
                  </div>
                ),
              ],
            })}
          </e.Fragment>
        )}
        {l.kind === "page" && l.id === "work" && (
          <e.Fragment>
            {e.jsxs(r, {
              tone: "base",
              children: [
                <h1 className={s.heroTitle}>{"Selected work"}</h1>,
                <p className={s.heroSub}>
                  {
                    "The same work the list covers, indexed by the thing built rather than by who it was built for."
                  }
                </p>,
              ],
            })}
            {e.jsxs(r, {
              tone: "inverse",
              children: [
                e.jsx(d, {
                  title: "Cases",
                  note: `${i.projects.length} in total`,
                }),
                i.projects.map((n) => {
                  const o = i.roles.find((h) => h.id === n.roleId);
                  return (
                    <button
                      type="button"
                      className={s.caseRow}
                      onClick={() =>
                        t({
                          kind: "project",
                          id: n.id,
                        })
                      }
                      key={n.id}
                    >
                      {<span className={s.caseRowNo}>{m.get(n.id)}</span>}
                      {
                        <span>
                          {<span className={s.caseRowName}>{n.name}</span>}
                          {<span className={s.caseRowLine}>{n.tagline}</span>}
                          {
                            <span className={s.caseRowOrg}>
                              {o != null ? o.company : "Personal"}
                              {" · "}
                              {n.period}
                            </span>
                          }
                        </span>
                      }
                      {
                        <span className={s.caseRowGlyph}>
                          {<S kind={n.id} />}
                        </span>
                      }
                      {<span className={s.caseRowArrow}>{"→"}</span>}
                    </button>
                  );
                }),
              ],
            })}
          </e.Fragment>
        )}
        {l.kind === "page" && l.id === "about" && (
          <e.Fragment>
            {e.jsxs(r, {
              tone: "base",
              children: [
                <h1 className={s.heroTitle}>{"About"}</h1>,
                <div className={s.prose}>
                  {
                    <div>
                      {i.about.map((n, o) => (
                        <p key={o}>{n}</p>
                      ))}
                    </div>
                  }
                  {
                    <div>
                      {i.marginalia.slice(0, 3).map((n) => (
                        <p className={s.note} key={n}>
                          {<span className={s.noteLabel}>{"Note"}</span>}
                          {n}
                        </p>
                      ))}
                    </div>
                  }
                </div>,
                <div className={s.sectors}>
                  {i.industries.map((n) => (
                    <span className={s.sectorItem} key={n}>
                      {n}
                    </span>
                  ))}
                </div>,
              ],
            })}
            {e.jsxs(r, {
              tone: "inverse",
              children: [
                e.jsx(d, {
                  title: "What I reach for",
                }),
                <div className={s.cols}>
                  {i.skills.map((n) => (
                    <div className={s.col} key={n.label}>
                      {<div className={s.colHead}>{n.label}</div>}
                      {
                        <ul className={s.colList}>
                          {n.items.map((o) => (
                            <li key={o}>{o}</li>
                          ))}
                        </ul>
                      }
                    </div>
                  ))}
                </div>,
              ],
            })}
            {e.jsxs(r, {
              tone: "base",
              children: [
                e.jsx(d, {
                  title: "Off the clock",
                }),
                i.stats.map((n) => (
                  <div className={s.contactRow} key={n.label}>
                    {<span className={s.contactKey}>{n.label}</span>}
                    {<span>{n.value}</span>}
                  </div>
                )),
              ],
            })}
          </e.Fragment>
        )}
        {l.kind === "page" && l.id === "writing" && (
          <e.Fragment>
            {e.jsx(r, {
              tone: "base",
              children: <h1 className={s.heroTitle}>{"Writing and talks"}</h1>,
            })}
            {e.jsxs(r, {
              tone: "inverse",
              children: [
                e.jsx(d, {
                  title: "Pieces",
                  note: `${i.posts.length}`,
                }),
                i.posts.map((n) => (
                  <a
                    className={s.row}
                    href={n.href ?? "#"}
                    target={n.href != null ? "_blank" : void 0}
                    rel="noreferrer"
                    onClick={(o) => {
                      n.href == null && o.preventDefault();
                    }}
                    key={n.id}
                  >
                    {<span className={s.rowWhen}>{B(n.date)}</span>}
                    {
                      <span>
                        {<span className={s.rowTitle}>{n.title}</span>}
                        {<span className={s.rowSummary}>{n.blurb}</span>}
                      </span>
                    }
                    {
                      <span className={s.rowTag}>
                        {n.minutes}
                        {" min"}
                      </span>
                    }
                  </a>
                )),
              ],
            })}
          </e.Fragment>
        )}
        {l.kind === "page" &&
          l.id === "contact" &&
          e.jsxs(r, {
            tone: "base",
            children: [
              <p className={s.signoff}>{i.signoff}</p>,
              <div className={s.contactRow}>
                {<span className={s.contactKey}>{"Email"}</span>}
                {<a href={`mailto:${i.email}`}>{i.email}</a>}
              </div>,
              i.socials.map((n) => (
                <div className={s.contactRow} key={n.label}>
                  {<span className={s.contactKey}>{n.label}</span>}
                  {
                    <a href={n.href} target="_blank" rel="noreferrer">
                      {n.handle}
                    </a>
                  }
                </div>
              )),
              i.marginalia.slice(0, 2).map((n) => (
                <p className={s.note} key={n}>
                  {<span className={s.noteLabel}>{"Note"}</span>}
                  {n}
                </p>
              )),
            ],
          })}
      </div>
    );
  };
export default vs;
