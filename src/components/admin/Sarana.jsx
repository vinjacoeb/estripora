import React from 'react';

const Sarana = () => {
    // Sample data for important facilities
    const importantFacilities = [
        { id: 1, name: 'Basketball Court', location: 'Main Campus', availability: 'Available' },
        { id: 2, name: 'Football Field', location: 'North Campus', availability: 'Under Maintenance' },
        { id: 3, name: 'Swimming Pool', location: 'South Campus', availability: 'Available' },
    ];

    return (
        <div className="container">
            <h1 className="my-4">Sarana Prasarana</h1>
            
            <h2>Important Facilities</h2>
            <div className="row">
                {importantFacilities.map(facility => (
                    <div className="col-lg-4 col-md-6 mb-4" key={facility.id}>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{facility.name}</h5>
                                <p className="card-text">
                                    <strong>Location:</strong> {facility.location}<br />
                                    <strong>Availability:</strong> {facility.availability}
                                </p>
                                <a href="#" className="btn btn-primary">View Details</a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <h2 className="mt-5">All Facilities</h2>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Location</th>
                        <th>Availability</th>
                    </tr>
                </thead>
                <tbody>
                    {importantFacilities.map(facility => (
                        <tr key={facility.id}>
                            <td>{facility.id}</td>
                            <td>{facility.name}</td>
                            <td>{facility.location}</td>
                            <td>{facility.availability}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Sarana;
