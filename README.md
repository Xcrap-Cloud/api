# 🕷️ Xcrap API Client

**Xcrap API Client** is a package for the [Xcrap Cloud](https://xcrap.cloud) service, designed for communicating with the API and handling authentication, management, and execution of scrapers and clients.

## 📦 Installation

Installation is straightforward. Just use your preferred dependency manager. Here is an example using NPM:

```cmd
npm i @xcrap/api
```

## 🚀 Usage

If you're using a different server based on Xcrap Cloud (yes, we're open source), change the `baseUrl` in the `Xcrap` constructor.

[![Buy Me A Coffee](https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png)](https://www.buymeacoffee.com/marcuth)

### Authentication

To access the routes, you must first authenticate. There are two ways to do this: using an email and password to get access tokens or using API Keys.

**Using email and password:**

```ts
import { Xcrap, AuthService } from "@xcrap/api"

;(async () => {
	const auth = new AuthService()

	const tokens = await auth.signIn({
		email: "YOUR_EMAIL",
		password: "YOUR_PASSWORD"
	})
	
	const xcrap = new Xcrap(tokens)
})();
```

**Using API Keys:**

```ts
import { Xcrap } from "@xcrap/api"

const xcrap = new Xcrap({ apiKey: "YOUR_API_KEY" })
```

-----

### Clients

#### Creating a Client

```ts
import { Xcrap, ClientType } from "@xcrap/api"

;(async () => {
	// Your way of instantiating Xcrap

	const client = await xcrap.clients.create({
		name: "A Cool Client",
		description: "A description for my Cool Client", // optional
		type: ClientType.Axios // Check if the type is actually available for the pointed server
	})

	console.log(client) // Displays a class called Client that has the following methods: update, delete
})();
```

#### Finding a Client

```ts
const client = await xcrap.clients.findOne("YOUR_CLIENT_ID")
```

#### Finding Multiple Clients

```ts
const clients = await xcrap.clients.findMany()
```

You can also paginate. The default and maximum amount of results will depend on the targeted server, but you can define it explicitly:

```ts
const clients1 = await xcrap.clients.findMany({ page: 1, perPage: 20 })
const clients2 = await xcrap.clients.findMany({ page: 2, perPage: 20 })
```

#### Updating a Client

```ts
const updatedClient = await xcrap.clients.update("YOUR_CLIENT_ID", {
	name: "Updated Cool Client",
	description: "A updated description for my Cool Client",
	type: "got_scraping" // Again, check if the type is available for the pointed server
})
```

**Using a Client object:**

```ts
await client.update({
	name: "Updated Cool Client",
	description: "A updated description for my Cool Client",
	type: "got_scraping" // Again, check if the type is available for the pointed server
})
```

#### Deleting a Client

```ts
await xcrap.clients.delete("YOUR_CLIENT_ID")
```

**Using a Client object:**

```ts
await client.delete()
```

-----

### Scrapers

#### Creating a Scraper

```ts
import { Xcrap, ParsingModelFieldType } from "@xcrap/api"

;(async () => {
	// Your way of instantiating Xcrap

	const scraper = await xcrap.scrapers.create({
		name: "A Cool Scraper",
		description: "A description for my Cool Scraper", // optional
		defaultUrl: "http://example.com", // optional
		clientId: "YOUR_CLIENT_ID",
		parsingModel: {
			type: ParsingModelFieldType.Html, // Check if the type is available for the pointed server
			model: {
				title: {
					query: "title",
					extractor: "text" // Check if the extractor is available for the pointed server
				},
				title: {
					query: "title",
					extractor: "attribute:content" // Again, check if the extractor is available for the pointed server
				}
			}
		}
	})

	console.log(scraper) // Displays a class called Scraper that has the following methods: update, delete, execute
})();
```

#### Finding a Scraper

```ts
const scraper = await xcrap.scrapers.findOne("YOUR_SCRAPER_ID")
```

#### Executing a Scraper

```ts
const { data, metadata } = await xcrap.scrapers.executeOne("YOUR_SCRAPER_ID")
```

**Using a Scraper object:**

```ts
const { data, metadata } = await scraper.execute()
```

#### Executing a Dynamic Scraper

To be clear, a dynamic scraper is a scraper that isn't registered in the database; it's created dynamically in real-time. You can also create a Client with it or just pass the ID of an existing one.

**Using an existing Client:**

```ts
const { data, metadata } = await xcrap.scrapers.executeOneDynamic({
	url: "http://example.com",
	clientId: "YOUR_CLIENT_ID",
	parsingModel: {
		type: ParsingModelFieldType.Html, // Check if the type is available for the pointed server
		model: {
			title: {
				query: "title",
				extractor: "text" // Check if the extractor is available for the pointed server
			},
			title: {
				query: "title",
				extractor: "attribute:content" // Again, check if the extractor is available for the pointed server
			}
		}
	}
})
```

**Dynamically creating a Client:**

```ts
const { data, metadata } = await xcrap.scrapers.executeOneDynamic({
	url: "http://example.com",
	client: {
		type: "puppeteer_real_browser" // Check if the type is actually available for the pointed server
	},
	parsingModel: {
		type: ParsingModelFieldType.Html, // Check if the type is available for the pointed server
		model: {
			title: {
				query: "title",
				extractor: "text" // Check if the extractor is available for the pointed server
			},
			title: {
				query: "title",
				extractor: "attribute:content" // Again, check if the extractor is available for the pointed server
			}
		}
	}
})
```

#### Finding Multiple Scrapers

```ts
const scrapers = await xcrap.scrapers.findMany()
```

You can also paginate. The default and maximum amount of results will depend on the targeted server, but you can define it explicitly:

```ts
const scrapers1 = await xcrap.scrapers.findMany({ page: 1, perPage: 20 })
const scrapers2 = await xcrap.scrapers.findMany({ page: 2, perPage: 20 })
```

#### Updating a Client

```ts
const updatedScraper = await xcrap.SCRAPERS.update("YOUR_SCAPER_ID", {
	name: "Updated Cool Scraper",
	description: "A updated description for my Cool Scraper",
	model: {
		title: {
			query: "title",
			extractor: "text" // Check if the extractor is available for the pointed server
		},
		title: {
			query: "title",
			extractor: "attribute:content" // Again, check if the extractor is available for the pointed server
		},
		heading: {
			query: "h1",
			extractor: "text"
		}
	}
})
```

**Using a Scraper object:**

```ts
await scraper.update({
	name: "Updated Cool Scraper",
	description: "A updated description for my Cool Scraper",
	model: {
		title: {
			query: "title",
			extractor: "text" // Check if the extractor is available for the pointed server
		},
		title: {
			query: "title",
			extractor: "attribute:content" // Again, check if the extractor is available for the pointed server
		},
		heading: {
			query: "h1",
			extractor: "text"
		}
	}
})
```

#### Deleting a Scraper

```ts
await xcrap.scrapers.delete("YOUR_CLIENT_ID")
```

**Using a Client object:**

```ts
await scraper.delete()
```

## 🧪 Tests

Automated tests are in `__tests__`. To run them:

```bash
npm run test
```

## 🤝 Contributing

  - Want to contribute? Follow these steps:
  - Fork the repository.
  - Create a new branch (`git checkout -b feature-new`).
  - Commit your changes (`git commit -m 'Add new feature'`).
  - Push to the branch (`git push origin feature-new`).
  - Open a Pull Request.

## 📝 License

This project is licensed under the MIT License.