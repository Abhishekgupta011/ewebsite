import './App.css';
import productsArr from './Components/Products.js/Products';
function App() {
  return (
    <div className="App">
      {productsArr.map((item)=>(
        <li className='item'>
          <span>{item.title}</span><br/>
          <img src={item.imageUrl} alt={item.title} /><br />
          <span>${item.price}</span><br/>
        </li>
      ))}
    </div>
  );
}

export default App;
