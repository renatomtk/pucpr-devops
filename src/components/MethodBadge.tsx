type Method = "GET" | "POST" | "PUT" | "DELETE";

const methodColors: Record<Method, string> = {
  GET: "text-method-get border-method-get/30 bg-method-get/10",
  POST: "text-method-post border-method-post/30 bg-method-post/10",
  PUT: "text-method-put border-method-put/30 bg-method-put/10",
  DELETE: "text-method-delete border-method-delete/30 bg-method-delete/10",
};

const MethodBadge = ({ method }: { method: Method }) => (
  <span
    className={`inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest rounded-sm border ${methodColors[method]}`}
  >
    {method}
  </span>
);

export default MethodBadge;
