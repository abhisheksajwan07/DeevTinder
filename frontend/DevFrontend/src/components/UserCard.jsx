const UserCard = ({user}) => {
  const { _id, firstName, lastName, photoUrl, age, gender, about } = user;
  // console.log(user)
  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure>
        <img className="h-62 w-full object-cover"
          src={photoUrl}
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender&& <p>{age+ "," + gender}</p>}
        <p>{about}</p>
        
        <div className="card-actions justify-center mt-2">
          <button className="btn btn-primary mr-2">Ignore</button>
          <button className="btn btn-secondary">Interested</button>

        </div>
      </div>
    </div>
  );
};

export default UserCard;
