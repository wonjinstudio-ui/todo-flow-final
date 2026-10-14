'use client';
import { useState } from 'react';
import { db } from '@/lib/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

export default function TodoInput() {
  const [text, setText] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() === '' || isSaving) return;

    setIsSaving(true);
    setError(null);
    try {
      await addDoc(collection(db, 'todos'), {
        text: text.trim(),
        isDone: false,
        createdAt: serverTimestamp(),
      });
      setText('');
    } catch {
      setError('할 일을 저장하지 못했습니다. 다시 시도해 주세요.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}
      >
        <input
          value={text}
          disabled={isSaving}
          onChange={(e) => setText(e.target.value)}
          placeholder="할 일을 입력하세요"
          style={{
            flex: 1,
            padding: '10px',
            borderRadius: '8px',
            border: '1px solid #ddd',
            fontSize: '1rem',
          }}
        />
        <button
          type="submit"
          disabled={isSaving || text.trim() === ''}
          style={{
            padding: '10px 20px',
            backgroundColor: '#4f46e5',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        >
          {isSaving ? '저장 중…' : '추가'}
        </button>
      </form>
      {error && <p role="alert">{error}</p>}
    </>
  );
}
