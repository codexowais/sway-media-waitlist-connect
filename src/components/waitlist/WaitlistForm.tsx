"use client";

import { useState, useRef, type FormEvent } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { validateEmail } from "@/lib/validation";
import { submitWaitlistEmail } from "@/lib/waitlist";

type FormState = "idle" | "active" | "loading" | "success" | "error";

export function WaitlistForm() {
  const [state, setState] = useState<FormState>("idle");
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const reduced = useReducedMotion();

  const transition = { duration: reduced ? 0 : 0.4 };

  function activate() {
    setState("active");
    // Focus input after the animation renders it
    requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const validationError = validateEmail(email);
    if (validationError) {
      setErrorMsg(validationError);
      setState("error");
      return;
    }

    setState("loading");
    setErrorMsg("");

    try {
      await submitWaitlistEmail(email.trim());
      setState("success");
    } catch (err) {
      setErrorMsg(
        err instanceof Error ? err.message : "Something went wrong.",
      );
      setState("error");
    }
  }

  function handleRetry() {
    setErrorMsg("");
    setState("active");
    requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
  }

  return (
    <div className="sway-waitlist" role="region" aria-label="Waitlist signup">
      <AnimatePresence mode="wait">
        {/* IDLE — CTA button */}
        {state === "idle" && (
          <motion.div
            key="cta"
            initial={{ opacity: 0, y: reduced ? 0 : 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduced ? 0 : -8 }}
            transition={transition}
          >
            <button
              type="button"
              className="sway-waitlist__cta"
              onClick={activate}
            >
              Join the Waitlist{" "}
              <span aria-hidden="true" className="sway-waitlist__arrow">
                →
              </span>
            </button>
          </motion.div>
        )}

        {/* ACTIVE / ERROR — Form */}
        {(state === "active" || state === "error" || state === "loading") && (
          <motion.form
            key="form"
            className="sway-waitlist__form"
            onSubmit={handleSubmit}
            noValidate
            initial={{ opacity: 0, y: reduced ? 0 : 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduced ? 0 : -8 }}
            transition={transition}
          >
            <label htmlFor="waitlist-email" className="sr-only">
              Your email address
            </label>
            <div className="sway-waitlist__field">
              <input
                ref={inputRef}
                id="waitlist-email"
                type="email"
                className="sway-waitlist__input"
                placeholder="YOUR EMAIL"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (state === "error") {
                    setErrorMsg("");
                    setState("active");
                  }
                }}
                disabled={state === "loading"}
                autoComplete="email"
                aria-describedby={errorMsg ? "waitlist-error" : undefined}
                aria-invalid={state === "error" ? true : undefined}
              />
              <button
                type="submit"
                className="sway-waitlist__submit"
                disabled={state === "loading"}
                aria-label={state === "loading" ? "Submitting…" : "Submit email"}
              >
                {state === "loading" ? (
                  <span className="sway-waitlist__spinner" aria-hidden="true" />
                ) : (
                  "→"
                )}
              </button>
            </div>
            <div className="sway-waitlist__line" aria-hidden="true" />

            <div aria-live="polite" className="sway-waitlist__feedback">
              {state === "error" && errorMsg && (
                <p id="waitlist-error" className="sway-waitlist__error">
                  {errorMsg}{" "}
                  <button
                    type="button"
                    className="sway-waitlist__retry"
                    onClick={handleRetry}
                  >
                    Try again
                  </button>
                </p>
              )}
            </div>
          </motion.form>
        )}

        {/* SUCCESS */}
        {state === "success" && (
          <motion.div
            key="success"
            className="sway-waitlist__success"
            initial={{ opacity: 0, scale: reduced ? 1 : 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={transition}
          >
            <p className="sway-waitlist__confirmation">You&apos;re in.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
