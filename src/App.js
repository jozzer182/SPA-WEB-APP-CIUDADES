import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React from "react";

const useState = React.useState;
const useEffect = React.useEffect;

function App() {
  const [datos, setdatos] = useState([]);
  const [datos2, setdatos2] = useState([]);
  const [headings, sethead] = useState([]);
  const [nfila, setnfila] = useState({});
  const [ciudades, setCiudades] = useState([]);

  useEffect(() => {
    // eslint-disable-next-line no-undef
    google.script.run.withSuccessHandler((d) => {
      setdatos(d);
      setdatos2(d);
      var aux = [];
      for (var key in d[0]) {
        aux.push(key);
      }
      sethead(aux.sort())
      let unique = [...new Set(d.map(a=>a.bciudad))];
      setCiudades(unique)
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
    google.script.run.withSuccessHandler(a => console.log(a)).addSheet([nfila]);
    console.log(datos)
    setnfila({})
  }

  function filtrar(e){
    setdatos(datos2.filter(b=>b.bciudad ===e))
  }

  function deleteData(row){
    setdatos(datos2.filter(a=>a.aid !==row))
    // eslint-disable-next-line no-undef
    google.script.run.withSuccessHandler(a => console.log(a)).deleteRow(row);
    // eslint-disable-next-line no-undef
    google.script.run.withSuccessHandler((d) => {
      setdatos(d);
      setdatos2(d);
      var aux = [];
      for (var key in d[0]) {
        aux.push(key);
      }
      sethead(aux.sort())
      let unique = [...new Set(d.map(a=>a.bciudad))];
      setCiudades(unique)
    }).traerDatos();
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
          {datos.map(c => <tr>{headings.map(d => <td>{c[d]}</td>)} <button onClick={()=>deleteData(c.aid)} >X</button> </tr>)}
        </tbody>
      </table>
      <input onChange={e => actualizarnfila(e.target.value, "aid")} type="text" placeholder="id2" />
      <input onChange={e => actualizarnfila(e.target.value, "bciudad")} type="text" placeholder="Ciudad" />
      <input onChange={e => actualizarnfila(e.target.value, "cpoblacion")} type="text" placeholder="Población" />
      <button onClick={actualizarDatos} className="btn btn-primary" >Actualizar</button>
      <select onChange={e => filtrar(e.target.value )} className="form-select" aria-label="Default select example" id="empresa">
        {ciudades.map(a=><option value={a}>{a}</option>)}
      </select>
    </div>
  );
}

export default App;
