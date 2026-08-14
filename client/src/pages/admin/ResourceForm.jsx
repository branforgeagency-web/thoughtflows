import { useState, useEffect } from "react";
import { X } from "lucide-react";
import MagneticButton from "../../components/MagneticButton";
import useFetch from "../../hooks/useFetch";
import { resources } from "../../config/adminResources";

const toId = (v) => (v && typeof v === "object" ? v._id : v);

function buildInitialValues(fields, item) {
  const values = {};
  fields.forEach((f) => {
    let val = item ? item[f.name] : undefined;
    if (f.type === "tags") {
      values[f.name] = Array.isArray(val) ? val.join(", ") : val || "";
    } else if (f.type === "multiselect") {
      values[f.name] = Array.isArray(val) ? val.map(toId) : [];
    } else if (f.type === "checkbox") {
      values[f.name] = !!val;
    } else if (f.type === "select") {
      values[f.name] = val || (f.options ? f.options[0] : "");
    } else {
      values[f.name] = val ?? "";
    }
  });
  return values;
}

function serializeValues(fields, values) {
  const payload = {};
  fields.forEach((f) => {
    if (f.type === "tags") {
      payload[f.name] = values[f.name]
        ? values[f.name].split(",").map((s) => s.trim()).filter(Boolean)
        : [];
    } else if (f.type === "number") {
      payload[f.name] = values[f.name] === "" ? undefined : Number(values[f.name]);
    } else {
      payload[f.name] = values[f.name];
    }
  });
  return payload;
}

function MultiSelectField({ field, value, onChange }) {
  const refConfig = resources[field.refResource];
  const { data: options } = useFetch(refConfig.endpoint);

  const toggle = (id) => {
    if (value.includes(id)) onChange(value.filter((v) => v !== id));
    else onChange([...value, id]);
  };

  return (
    <div className="flex flex-wrap gap-2 glass rounded-xl p-3 max-h-40 overflow-y-auto">
      {options?.map((opt) => (
        <button
          type="button"
          key={opt._id}
          onClick={() => toggle(opt._id)}
          className={`text-xs px-3 py-1.5 rounded-full transition ${
            value.includes(opt._id) ? "bg-teal-500 text-ink-950" : "bg-navy-900/5 text-navy-900/60 hover:bg-navy-900/10"
          }`}
        >
          {opt[refConfig.titleField]}
        </button>
      ))}
      {!options && <span className="text-navy-900/30 text-xs">Loading options...</span>}
    </div>
  );
}

export default function ResourceForm({ config, item, onCancel, onSubmit, submitting }) {
  const [values, setValues] = useState(() => buildInitialValues(config.fields, item));
  const [error, setError] = useState("");

  useEffect(() => {
    setValues(buildInitialValues(config.fields, item));
  }, [item, config]);

  const handleChange = (name, val) => setValues((v) => ({ ...v, [name]: val }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const missing = config.fields.find((f) => f.required && !values[f.name]);
    if (missing) {
      setError(`${missing.label} is required.`);
      return;
    }
    try {
      await onSubmit(serializeValues(config.fields, values));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save. Please check the fields and try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-ink-950/90 backdrop-blur-md flex items-center justify-center p-4 md:p-8" onClick={onCancel}>
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="glass-strong rounded-2xl p-8 w-full max-w-2xl max-h-[85vh] overflow-y-auto flex flex-col gap-5"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-navy-900">{item ? `Edit ${config.label.slice(0, -1)}` : `New ${config.label.slice(0, -1)}`}</h2>
          <button type="button" onClick={onCancel} className="text-navy-900/50 hover:text-navy-900">
            <X size={20} />
          </button>
        </div>

        {config.fields.map((f) => (
          <div key={f.name} className="flex flex-col gap-2">
            <label className="text-xs text-navy-900/50 font-medium">
              {f.label} {f.required && <span className="text-teal-600">*</span>}
            </label>

            {f.type === "textarea" && (
              <textarea
                rows={3}
                value={values[f.name] || ""}
                onChange={(e) => handleChange(f.name, e.target.value)}
                className="glass rounded-xl px-4 py-3 text-sm text-navy-900 outline-none focus:border-teal-400/40 resize-none"
              />
            )}

            {f.type === "select" && (
              <select
                value={values[f.name] || ""}
                onChange={(e) => handleChange(f.name, e.target.value)}
                className="glass rounded-xl px-4 py-3 text-sm text-navy-900 bg-transparent outline-none focus:border-teal-400/40"
              >
                {f.options.map((opt) => (
                  <option key={opt} value={opt} className="bg-white">{opt}</option>
                ))}
              </select>
            )}

            {f.type === "checkbox" && (
              <input
                type="checkbox"
                checked={!!values[f.name]}
                onChange={(e) => handleChange(f.name, e.target.checked)}
                className="h-5 w-5 accent-teal-500 self-start"
              />
            )}

            {f.type === "multiselect" && (
              <MultiSelectField field={f} value={values[f.name] || []} onChange={(v) => handleChange(f.name, v)} />
            )}

            {["text", "number", "url", "tags"].includes(f.type) && (
              <input
                type={f.type === "number" ? "number" : "text"}
                value={values[f.name] ?? ""}
                onChange={(e) => handleChange(f.name, e.target.value)}
                className="glass rounded-xl px-4 py-3 text-sm text-navy-900 outline-none focus:border-teal-400/40"
              />
            )}
          </div>
        ))}

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <div className="flex gap-3 mt-2">
          <MagneticButton type="submit" disabled={submitting} className="flex-1 justify-center">
            {submitting ? "Saving..." : "Save"}
          </MagneticButton>
          <button type="button" onClick={onCancel} className="px-6 py-4 rounded-full glass text-navy-900/70 hover:text-navy-900 text-sm">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
