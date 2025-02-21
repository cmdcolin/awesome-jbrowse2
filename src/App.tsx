import SanitizedHTML from './SanitizedHTML'
import links from '../LINKS.json'
import slugify from 'slugify'
import Link from './Link'
import { Tool } from './types'

const Cards = ({ tools }: { tools: Tool[] }) => {
  return tools.map(row => <Card row={row} key={row.name} />)
}

const Card = ({
  row: {
    name,
    url,
    language,
    tags,
    img,
    width,
    height,
    github,
    twitter,
    platform,
    github_stars,
    pub,
    note,
    alt_url,
  },
}: {
  row: Tool
}) => {
  const slug = slugify(name, { remove: /[*+~.()'"!:@]/g })
  return (
    <div className="flex flex-col lg:flex-row justify-between border border-[#ccc] dark:border-[#666] border-solid p-4 shadow-xs shadow-[#ccc] dark:shadow-[#333]">
      <div>
        <h3 className="m-0 text-xl mb-4">
          <Link
            id={slug}
            href="#"
            onClick={event => {
              event.preventDefault()
            }}
          >
            {name}
          </Link>
        </h3>
        <p className="link">
          <Link href={url}>{url}</Link>
        </p>
        {alt_url ? (
          <p className="link">
            Alt url <Link href={alt_url}>{alt_url}</Link>
          </p>
        ) : null}
        {pub ? (
          <p>
            Publication:{' '}
            {pub.url ? <Link href={pub.url}>(direct link)</Link> : null}{' '}
            {pub.doi ? (
              <Link
                href={
                  pub.doi.startsWith('http')
                    ? pub.doi
                    : 'https://dx.doi.org/' + pub.doi
                }
              >
                <SanitizedHTML html={pub.title} />
              </Link>
            ) : null}{' '}
            {pub.year ? ` (${pub.year})` : null}
            {pub.citations !== undefined
              ? ` (# citations ${pub.citations})`
              : null}
          </p>
        ) : null}
        {language ? <p>Language: {language.join(', ')}</p> : null}
        {tags ? (
          <p>
            Tags:{' '}
            {tags.map((tag, index) => [
              index > 0 && ', ',
              <Link
                key={tag + '-' + index}
                onClick={event => {
                  event.preventDefault()
                }}
              >
                {tag}
              </Link>,
            ])}
          </p>
        ) : null}
        {note ? <p>Note: {note}</p> : null}
        {twitter ? (
          <p className="link">
            Twitter: <Link href={twitter}>{twitter}</Link>
          </p>
        ) : null}
        {github ? (
          <p className="link">
            Github: <Link href={github}>{github}</Link>
          </p>
        ) : null}

        {github_stars ? <p>Github Stargazers: {github_stars}</p> : null}
        {platform ? <p>Platform: {platform.join(', ')}</p> : null}
      </div>
      <figure role="presentation" onClick={() => {}}>
        {img ? (
          <img
            alt={`screenshot of ${name}`}
            loading="lazy"
            className="max-h-sm h-auto max-w-sm"
            width={width}
            height={height}
            src={'img/' + img}
          />
        ) : (
          <p className="no-screenshot">No screenshot</p>
        )}
      </figure>
    </div>
  )
}

const IndexPage = () => {
  const githubURL = 'https://github.com/cmdcolin/awesome-jbrowse2'

  return (
    <div className="m-auto max-w-7xl flex flex-col gap-4">
      <h1 className="text-3xl">awesome-genome-visualization</h1>
      <p>
        This is a companion website for the github repo{' '}
        <Link href={githubURL}>{githubURL}</Link>
      </p>
      <p>
        Also check out our twitter account{' '}
        <Link href="https://twitter.com/awesomejbrowse2">@awesomejbrowse2</Link>
      </p>
      <div style={{ maxWidth: 500 }}>
        <p>Feel free to submit PRs to add more jbrowse 2 stuff!</p>
      </div>
      <Cards tools={links.links} />

      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={20}
        height={20}
        onClick={() => window.scrollTo(0, 0)}
        className="top-link"
        viewBox="0 0 12 6"
      >
        <path d="M12 6H0l6-6z" />
      </svg>
    </div>
  )
}

export default IndexPage
