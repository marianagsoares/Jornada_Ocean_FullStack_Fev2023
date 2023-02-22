import "../Card/Card.css"

function Card(properties){
  const nome = properties.nomeProp;
  const imagemUrl = properties.imagemUrlProp;

  return (
    <div className="card">
      <p>{nome}</p>
      <img
        src={imagemUrl}/>
    </div>
  );
}

/*function Card(properties){
  return (
    <div className="card">
      <p>{properties.nomeProp}</p>
      <img
        src={properties.imagemUrlProp}/>
    </div>
  );
}

function Card({nomeProp, imagemUrlProp}){
  return (
    <div className="card">
      <p>{nomeProp}</p>
      <img
        src={imagemUrlProp}/>
    </div>
  );
}*/
export default Card;