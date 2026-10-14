'use client';
import { useEffect, useState } from 'react';
import { useSettings } from '@/hooks/useSettings';
import { db } from '@/lib/firebase';
import { Todo } from '@/types/todo';
import { collection, query, orderBy, onSnapshot, updateDoc, deleteDoc, doc } from 'firebase/firestore';

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { filter } = useSettings();

  // 💡 [과제 4] onSnapshot으로 "todos" 컬렉션을 실시간 구독하세요.
  //    createdAt 기준 내림차순(desc) 정렬
  //    가져온 데이터를 setTodos로 업데이트하세요.
  //    컴포넌트 언마운트 시 구독을 해제하는 클린업 함수를 return하세요.
  useEffect(() => {
    const todosQuery = query(collection(db, 'todos'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(
      todosQuery,
      (snapshot) => {
        setTodos(snapshot.docs.map((document) => {
          const data = document.data();
          return {
            id: document.id,
            text: data.text,
            isDone: data.isDone,
            createdAt: data.createdAt ?? null,
          };
        }));
        setError(null);
      },
      () => setError('할 일 목록을 불러오지 못했습니다. 연결과 Firestore 권한을 확인해 주세요.'),
    );

    return unsubscribe;
  }, []);

  // 💡 [과제 6] 완료/미완료 토글 — updateDoc으로 isDone 값을 반전시키세요.
  const handleToggle = async (todo: Todo) => {
    setError(null);
    try {
      await updateDoc(doc(db, 'todos', todo.id), { isDone: !todo.isDone });
    } catch {
      setError('완료 상태를 변경하지 못했습니다. 다시 시도해 주세요.');
    }
  };

  const handleDelete = async (id: string) => {
    setError(null);
    try {
      await deleteDoc(doc(db, 'todos', id));
    } catch {
      setError('할 일을 삭제하지 못했습니다. 다시 시도해 주세요.');
    }
  };

  // Redux filter 상태로 목록을 필터링합니다.
  const filtered = todos.filter((t) => {
    if (filter === '진행 중') return !t.isDone;
    if (filter === '완료') return t.isDone;
    return true; // 'all'
  });

  return (
    <>
      {error && <p role="alert">{error}</p>}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {filtered.map((todo) => (
          <li
            key={todo.id}
            onClick={() => handleToggle(todo)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '14px 18px',
              marginBottom: '10px',
              backgroundColor: 'white',
              color: '#171717',
              border: '1px solid #eee',
              borderRadius: '10px',
              cursor: 'pointer',
              boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
              textDecoration: todo.isDone ? 'line-through' : 'none',
              opacity: todo.isDone ? 0.5 : 1,
            }}
          >
            <span>{todo.isDone ? '✅' : '⬜'}</span>
            <span style={{ flex: 1 }}>{todo.text}</span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                void handleDelete(todo.id);
              }}
              style={{
                padding: '4px 10px',
                background: '#ef4444',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
              }}
            >
              삭제
            </button>
          </li>
        ))}
      </ul>
      {!error && filtered.length === 0 && (
        <p style={{ textAlign: 'center', color: '#aaa' }}>항목이 없습니다.</p>
      )}
    </>
  );
}
