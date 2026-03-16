import Logo from "./Logo";

interface NavItem {
  label: string;
  section?: string;
  active?: boolean;
}

const navSections: { title: string; items: NavItem[] }[] = [
  {
    title: "Getting Started",
    items: [
      { label: "Introduction" },
      { label: "Authentication", active: true },
      { label: "Rate Limits" },
    ],
  },
  {
    title: "Endpoints",
    items: [
      { label: "GET /users" },
      { label: "POST /users" },
      { label: "GET /users/:id" },
      { label: "PUT /users/:id" },
      { label: "DELETE /users/:id" },
    ],
  },
  {
    title: "Webhooks",
    items: [
      { label: "Events" },
      { label: "Signatures" },
    ],
  },
];

const Sidebar = () => (
  <aside className="w-64 shrink-0 border-r border-border bg-sidebar sticky top-0 h-screen overflow-y-auto">
    <div className="py-8 px-6">
      <Logo />
      <nav className="mt-10 space-y-8">
        {navSections.map((section) => (
          <div key={section.title}>
            <h4 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">
              {section.title}
            </h4>
            <ul className="space-y-1">
              {section.items.map((item) => (
                <li key={item.label}>
                  <button
                    className={`w-full text-left px-3 py-1.5 rounded-md text-sm transition-colors duration-150 ${
                      item.active
                        ? "bg-secondary text-foreground font-medium"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </div>
  </aside>
);

export default Sidebar;
