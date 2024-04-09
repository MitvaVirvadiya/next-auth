function UserPage({ params }: any) {
  return (
    <div className="m-4 flex flex-col items-start justify-start min-h-screen py-2">
      <h1 className="text-4xl font-semibold tracking-tight">Profile</h1>
      <hr />
      <p className="text-2xl">
        Profile page
        <span className=" p-2 ml-2 rounded bg-orange-500 text-black">
          {params.id}
        </span>
      </p>
    </div>
  );
}

export default UserPage;
