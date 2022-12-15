import '../styles/App.scss';
// import data from '../data/api'
import { useEffect, useState } from 'react';

function App() {

  //VARIABLES ESTADO
  const [adalabers, setAdalabers] = useState([]);
  const [newAdalaber, setNewAdalaber] = useState({
    id: crypto.randomUUID(),
    name: "",
    counselor: "",
    promo: "",
    speciality: "",
    social_networks: [],
  });
  const [search, setSearch] = useState('');
  const [selectSearch, setSelectSearch] = useState('');
  //USEEFFECT

  useEffect(() => {
    fetch('https://beta.adalab.es/curso-intensivo-fullstack-recursos/apis/adalabers-v1/promo-radsajsd.json')
      .then((response) => response.json())
      .then((data) => {
        setAdalabers(data.results);
      })
  }, []);
  //FUNCIONES HANDLER
  const handleNewAdalaber = (ev) => {
    setNewAdalaber({ ...newAdalaber, [ev.target.id]: ev.target.value });
  }
  const handleClick = (ev) => {
    ev.preventDefault();
    setAdalabers([...adalabers, newAdalaber]);
    setNewAdalaber({
      id: "",
      name: "",
      counselor: "",
      speciality: "",
    });
  }

  const handleSearch = (ev) => {
    setSearch(ev.target.value);
  }
  const handleSelectSearch = (ev) => {
    setSelectSearch(ev.target.value);
  }
  //FUNCIONES Y VARIABLES QUE AYUDEN A RENDERIZAR EL HTML

  const htmlData = adalabers
    .filter((eachAdalaber) => eachAdalaber.name.toLowerCase().includes(search.toLowerCase()))
    .filter((eachAdalaber) => eachAdalaber.counselor.includes(selectSearch))
    .map((eachAdalaber) => {
      return (
        <tr key={eachAdalaber.id} className='main_form_table-tr'>
          <td>{eachAdalaber.name}</td>
          <td>{eachAdalaber.counselor}</td>
          <td>{eachAdalaber.speciality}</td>
          <td>
            {eachAdalaber.social_networks.map((eachNetwork, index) => { 
              return <a key={index} href={eachNetwork.url}>{eachNetwork.name}  </a>
            })}
          </td>
        </tr>
      )
    });
  //HTML EN EL RETURN

  return (
    <div className="App">
      <header className='header'>
        <h1 className='header_title'>Adalabers</h1>
        <form className='header_form'>
          <label className='header_form_label' htmlFor="nameSearch">Nombre:</label>
          <input type="text" name='nameSearch' id='name' value={search} onChange={handleSearch} className='header_form_input'/>
          <label className='header_form_label' htmlFor="counselorSearch">Tutora:</label>
          <select name="counselor" id="counselor" onChange={handleSelectSearch} value={selectSearch} className='header_form_input'>
            <option>Cualquiera</option>
            <option value="Yanelis">Yanelis</option>
            <option value="Dayana">Dayana</option>
            <option value="Iván">Iván</option>
          </select>
        </form>
      </header>
      <main className='main'>
        <table className="main_table">
          <thead className='main_table_head'><tr>
            <th>Nombre</th>
            <th>Tutora</th>
            <th>Especialidad</th>
            <th>Redes Sociales</th>
          </tr></thead>
          <tbody className='main_table_body'>
            {htmlData}
          </tbody>
        </table>
        <form className='form'>
          <label  className='form_label'  htmlFor="adalaberName">Nombre:</label>
          <input type="text" className='form_input' name='adalaberName' id='name' value={newAdalaber.name} onChange={handleNewAdalaber} />
          <label className='form_label' htmlFor="counselor">Tutora:</label>
          <input type="text" name='counselor' id='counselor' value={newAdalaber.counselor} onChange={handleNewAdalaber} className='form_input' />
          <label className='form_label'  htmlFor="speciality">Especialidad:</label>
          <input type="text" name='speciality' id='speciality' value={newAdalaber.speciality} onChange={handleNewAdalaber} className='form_input' />
          <input type="submit" value='Añadir una nueva Adalaber' onClick={handleClick} className='form_btn'/>
        </form>
      </main>
    </div>

  );
}

export default App;
