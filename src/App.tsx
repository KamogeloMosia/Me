import React from 'react';
import Layout from './components/Layout';

function App() {
  return (
    <Layout>
      <section className="hero rounded-box bg-base-100 shadow-xl">
        <div className="hero-content flex-col lg:flex-row-reverse p-8">
          <div className="text-center lg:text-left lg:pl-8">
            <h1 className="text-4xl md:text-5xl font-bold text-primary">
              Welcome to My Portfolio
            </h1>
            <p className="py-6 text-lg">
              Professional developer with expertise in web technologies
            </p>
            <button className="btn btn-primary">View Projects</button>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300"
          >
            <div className="card-body">
              <h2 className="card-title text-primary">Project {item}</h2>
              <p className="text-base-content/80">
                Description of project {item}
              </p>
              <div className="card-actions justify-end mt-4">
                <button className="btn btn-primary btn-outline">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export default App;
