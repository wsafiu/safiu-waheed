const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

async function fetchProjects() {
  try {
    console.log('Fetching pinned repositories from GitHub...');
    
    const query = `
      query($username: String!) {
        user(login: $username) {
          pinnedItems(first: 6, types: REPOSITORY) {
            nodes {
              ... on Repository {
                name
                description
                url
                homepageUrl
                languages(first: 5) {
                  nodes {
                    name
                  }
                }
              }
            }
          }
        }
      }
    `;

    // Fetch using gh CLI (requires authentication via 'gh auth login' or GITHUB_TOKEN)
    const output = execSync(`gh api graphql -F username=waheedianho -f query='${query}'`, { encoding: 'utf-8' });
    const data = JSON.parse(output);
    
    const pinnedRepos = data.data.user.pinnedItems.nodes;
    
    // Transform to match the structure expected by the frontend
    const projects = pinnedRepos.map((repo, index) => ({
      projectId: index + 1,
      title: repo.name,
      desc: repo.description || "No description provided.",
      resources: repo.languages.nodes.map(lang => lang.name),
      status: "completed",
      repo: repo.url,
      url: repo.homepageUrl || repo.url
    }));

    const outputPath = path.join(__dirname, 'src', 'projects.json');
    fs.writeFileSync(outputPath, JSON.stringify(projects, null, 2));
    
    console.log('✅ Successfully updated src/projects.json with pinned repositories!');
  } catch (error) {
    console.error('❌ Failed to fetch pinned repositories:', error.message);
    console.log('Continuing with existing projects.json...');
  }
}

fetchProjects();
