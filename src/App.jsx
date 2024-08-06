import { useEffect, useState } from 'react';
import './App.css'
import Main from './components/Main';
import Sidebar from './components/Sidbar'; 
import uuid from 'react-uuid';


function App(){
  //これは最初の設定になる。
  // ローカルストレージから値を取ってくる
  //SON形式で書かれた文字列をJavaScriptのJSONオブジェクトに変換するメソッド
  // 変換した場合は、JavaScriptの中でJSONのデータを自由に扱えるようになる
  //ここでは再度jsで保存したデータを利用したいから
  const [notes , setNotes] = useState(JSON.parse(localStorage.getItem("notes") || []));
  const [activeNote , setActiveNote] = useState(false);

  useEffect(() => {
    //ローカルストレージにノートを保存する
    // ノートが作成されたら追加を行いため、useEffectを使用する
    // localStorageは文字列のみを保存できる仕組みになっていて、それ以外は保存することはできない
    // そのため、ここでは一旦オブジェクトや配列を変換している
    localStorage.setItem("notes" , JSON.stringify(notes));
  } , [notes]);

  useEffect(() => {
    if(notes.length > 0)
    {
      setActiveNote(notes[0].id);
    }
  } , []);

  const onAddNote = () => {
    const newNote = {
      id : uuid(),
      title : "タイトル",
      content : "内容",
      modDate : Date.now(),
    };
    setNotes([...notes , newNote]);
  };

  const deleteNote = async( noteid ) => {
    setNotes((latestNote) => latestNote.filter((lnote) => lnote.id !== noteid));
  };

  const getActiveNote = () => {
    return notes.find((note) => note.id === activeNote);
  }

  const onUpdateNote = (updateNote) => {
    //修正された新しいノートの配列を返す処理
    const updateNoteArray = notes.map((note) => {
      if(note.id === updateNote.id){
        return updateNote;
      } else {
        return note;
      }
    });

    //修正したものを新しく適用するために管理していたsetNotesとしてる
    setNotes(updateNoteArray);
  }

  return (  
  <div className='App'>
    <Sidebar onAddNote={onAddNote} notes={notes} deleteNote={deleteNote}
      setActiveNote={setActiveNote} activeNote={activeNote}/>
    <Main activeNote={getActiveNote()} onUpdateNote={onUpdateNote} />
  </div>
  );
}

export default App;