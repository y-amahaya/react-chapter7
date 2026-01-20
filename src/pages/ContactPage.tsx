import { useState } from "react";
import styles from "./ContactPage.module.css";

const CONTACT_API =
  "https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/contacts";

type ContactForm = {
  name: string;
  email: string;
  message: string;
};

type ContactErrors = Partial<Record<keyof ContactForm, string>>;

const initialForm: ContactForm = {
  name: "",
  email: "",
  message: "",
};

export default function ContactPage() {
  const [form, setForm] = useState<ContactForm>(initialForm);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = (values: ContactForm): ContactErrors => {
    const nextErrors: ContactErrors = {};

    if (!values.name.trim()) {
      nextErrors.name = "お名前は必須です。";
    } else if (values.name.length > 30) {
      nextErrors.name = "お名前は30文字以内で入力してください。";
    }

    if (!values.email.trim()) {
      nextErrors.email = "メールアドレスは必須です。";
    } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
      nextErrors.email = "メールアドレスの形式が正しくありません。";
    }

    if (!values.message.trim()) {
      nextErrors.message = "本文は必須です。";
    } else if (values.message.length > 500) {
      nextErrors.message = "本文は500文字以内で入力してください。";
    }


    return nextErrors;
  };

  const handleClear = () => {
    setForm(initialForm);
    setErrors({});
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const nextErrors = validate(form);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    setIsSubmitting(true);

    try {
      const res = await fetch(CONTACT_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });

      if (!res.ok) return;

      alert("送信しました。");
      handleClear();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className={styles.main}>
      <h1 className={styles.pageTitle}>問い合わせフォーム</h1>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formRow}>
          <label className={styles.label} htmlFor="name">
            お名前
          </label>
          <div className={styles.field}>
            <input
              id="name"
              name="name"
              type="text"
              className={styles.input}
              value={form.name}
              onChange={handleChange}
              disabled={isSubmitting}
            />
            {errors.name && <p className={styles.error}>{errors.name}</p>}
          </div>
        </div>

        <div className={styles.formRow}>
          <label className={styles.label} htmlFor="email">
            メールアドレス
          </label>
          <div className={styles.field}>
            <input
              id="email"
              name="email"
              type="email"
              className={styles.input}
              value={form.email}
              onChange={handleChange}
              disabled={isSubmitting}
            />
            {errors.email && <p className={styles.error}>{errors.email}</p>}
          </div>
        </div>

        <div className={styles.formRow}>
          <label className={styles.label} htmlFor="message">
            本文
          </label>
          <div className={styles.field}>
            <textarea
              id="message"
              name="message"
              className={styles.textarea}
              value={form.message}
              onChange={handleChange}
              disabled={isSubmitting}
              rows={8}
            />
            {errors.message && (
              <p className={styles.error}>{errors.message}</p>
            )}
          </div>
        </div>

        <div className={styles.formActions}>
          <button
            type="submit"
            className={styles.primaryButton}
            disabled={isSubmitting}
          >
            送信
          </button>

          <button
            type="button"
            className={styles.secondaryButton}
            onClick={handleClear}
            disabled={isSubmitting}
          >
            クリア
          </button>
        </div>
      </form>
    </main>
  );
}
