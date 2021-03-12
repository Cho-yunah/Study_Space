import './App.css';
import { useCallback, useState, useRef } from 'react';
import produce from 'immer';

// const App = () => {
//   const nextId = useRef(1);
//   const [form, setForm] = useState({ name: '', username: '' });
//   const [data, setData] = useState({
//     array: [],
//     uselessValue: null,
//   });

//   const onChange = useCallback(e => {
//     const { name, value } = e.target;
//     setForm(
//       produce(draft => {
//         draft[name] = value;
//       }),
//     );
//   }, []);

//   const onSubmit = useCallback(
//     e => {
//       e.preventDefault();
//       const info = {
//         id: nextId.current,
//         name: form.name,
//         username: form.username,
//       };
//       setData(
//         produce(draft => {
//           draft.array.push(info);
//         }),
//       );

//       setForm({
//         name: '',
//         username: '',
//       });
//       nextId.current += 1;
//     },
//     [form.name, form.username],
//   );

//   const onRemove = useCallback(id => {
//     setData(
//       produce(draft => {
//         draft.array.splice(
//           data.array.findIndex(info => info.id === id),
//           1,
//         );
//       }),
//     );
//   }, []);

//   return (
//     <div>
//       <form onSubmit={onSubmit}>
//         <input name='username' placeholder='아이디' value={form.username} onChange={onChange} />
//         <input name='name' placeholder='이름' value={form.name} onChange={onChange} />
//         <button type='submit'>등록</button>
//       </form>
//       <div>
//         <ul>
//           {data.array.map(info => (
//             <li key={info.id} onClick={() => onRemove(info.id)}>
//               {info.username}({info.name})
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

const App = () => {
  const [data, setData] = useState(null);
  const onClick = () => {
    axios.get('https://jsonplaceholder.typicode.com/todos/1').then(response => {
      setData(response.data);
    });
  };
  return (
    <div>
      <div>
        <button onClick={onClick}>불러오기</button>
      </div>
      {data && <textarea row={7} value={JSON.stringify(data, null, 2)} readOnly={true} />}
    </div>
  );
};

export default App;
