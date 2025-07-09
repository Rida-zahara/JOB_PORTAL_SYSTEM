const API = 'http://localhost:5000/api/jobs';

async function postJob() {
  const title = document.getElementById('title').value;
  const company = document.getElementById('company').value;
  const location = document.getElementById('location').value;
  const experience = document.getElementById('experience').value;
  const mode = document.getElementById('mode').value;
  const description = document.getElementById('description').value;

  const res = await fetch(`${API}/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, company, location, experience, mode, description })
  });

  if (res.ok) {
    alert("Job posted!");
    fetchJobs();
  } else {
    alert("Error posting job.");
  }
}

async function fetchJobs() {
  const res = await fetch(API);
  const jobs = await res.json();
  const jobsDiv = document.getElementById('jobs');
  jobsDiv.innerHTML = '';

  jobs.forEach(job => {
    const div = document.createElement('div');
    div.className = 'job-card';
    div.innerHTML = `
      <h3>${job.title}</h3>
      <p><strong>Company:</strong> ${job.company}</p>
      <p><strong>Experience:</strong> ${job.experience}</p>
      <p><strong>Mode:</strong> ${job.mode}</p>
      <p>${job.description}</p>
      <p><strong>Location:</strong> ${job.location}</p>
      <p><strong>Applicants:</strong> ${job.applicants}</p>
      <button onclick="applyJob('${job._id}')">Apply</button>
      <button onclick="deleteJob('${job._id}')">Delete</button>
    `;
    jobsDiv.appendChild(div);
  });
}

async function deleteJob(id) {
  const res = await fetch(`${API}/${id}`, { method: 'DELETE' });
  if (res.ok) {
    alert("Job deleted");
    fetchJobs();
  } else {
    alert("Delete failed");
  }
}

async function applyJob(id) {
  const res = await fetch(`${API}/apply/${id}`, { method: 'POST' });
  if (res.ok) {
    alert("Application submitted");
    fetchJobs();
  } else {
    alert("Application failed");
  }
}

window.onload = fetchJobs;
