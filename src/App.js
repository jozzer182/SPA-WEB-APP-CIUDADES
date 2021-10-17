import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React from "react";

const useState = React.useState;
const useEffect = React.useEffect;

function App() {
  const [datos, setdatos] = useState([]);
  const [headings, sethead] = useState([]);
  const [nfila, setnfila] = useState({})

  useEffect(() => {
    // eslint-disable-next-line no-undef
    google.script.run.withSuccessHandler((d) => {
      setdatos(d);
      var aux = [];
      for (var key in d[0]) {
        aux.push(key);
      }
      sethead(aux.sort())
    }).traerDatos();
  }, [])

  function actualizarnfila(e, prop) {
    setnfila(prev => {
      prev[prop] = e
      return prev
    })
    console.log(nfila)
  }

  function actualizarDatos() {
    setdatos(prev => prev.concat(nfila))
    // eslint-disable-next-line no-undef
    google.script.run.withSuccessHandler(a=>console.log(a)).addSheet([nfila]);
    console.log(datos)
    setnfila({})
  }

  return (
    <div className="App">
      <table className="table">
        <thead>
          <tr>
            {headings.map(c => <th>{c.substr(1)}</th>)}
          </tr>
        </thead>
        <tbody>
          {datos.map(c => <tr>{headings.map(d => <td>{c[d]}</td>)}</tr>)}
        </tbody>
      </table>
      <input onChange={e => actualizarnfila(e.target.value,"aid")} type="text" placeholder="id" />
      <input onChange={e => actualizarnfila(e.target.value,"bciudad")} type="text" placeholder="Ciudad" />
      <input onChange={e => actualizarnfila(e.target.value,"cpoblacion")} type="text" placeholder="Población" />
      <button onClick={actualizarDatos} className="btn btn-primary" >Actualizar</button>
    </div>
  );
}

export default App;
