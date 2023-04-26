import {Component} from 'react'

import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'

import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

class GithubPopularRepos extends Component {
  state = {idd: languageFiltersData[0].id, projectsData: [], isLoading: true}

  componentDidMount() {
    this.getCardsData()
  }

  getCardsData = async () => {
    const response = await fetch('https://apis.ccbp.in/popular-repos')
    const data = await response.json()

    const updatedData = data.map(each => ({
      name: each.name,
      id: each.id,
      issuesCount: each.isues_count,
      forksCount: each.forks_count,
      starsCount: each.stars_count,
      avatarUrl: each.avatar_url,
    }))
    this.setState({projectsData: updatedData, isLoading: false})
  }

  getFilteredProjects = () => {
    const {idd, projectsData} = this.state
    const filteredProjects = projectsData.filter(each => each.id === idd)
    return filteredProjects
  }

  clickTabItem = id => {
    this.setState({idd: id})
  }

  loadingdots = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  render() {
    const {idd, projectsData, isLoading} = this.state
    const filteredProjects = this.getFilteredProjects()

    return (
      <div className="bg">
        <h1 className="popular">Popular</h1>

        {isLoading && this.loadingdots()}

        <ul className="tabsList">
          {languageFiltersData.map(each => (
            <LanguageFilterItem
              key={each.id}
              tabDetails={each}
              clickTabItem={this.clickTabItem}
              isActive={idd === each.id}
            />
          ))}
        </ul>

        <ul>
          {filteredProjects.map(each => (
            <repositoryItem key={each.id} repoDetails={each} />
          ))}
        </ul>
      </div>
    )
  }
}

export default GithubPopularRepos
