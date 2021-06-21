- These days, code that runs in the browser uses ES6 modules. Modules are defined with an export and taken into use with an import. However, Node.js uses so-called CommonJS modules. The reason for this is that the Node ecosystem had a need for modules long before JavaScript supported them in the language specification.
- The HTTP standard talks about two properties related to request types, safety and idempotence.
- Safety means that the executing request must not cause any side effects in the server. 
- Methods can also have the property of "idempotence" in that (aside from error or expiration issues) the side-effects of N > 0 identical requests is the same as for a single request. The methods GET, HEAD, PUT and DELETE share this property.
- Middleware are functions that can be used for handling request and response objects.


- The name of the collection will be the lowercased plural notes, because the Mongoose convention is to automatically name collections as the plural (e.g. notes) when the schema refers to them in the singular (e.g. Note).
- Document databases like Mongo are schemaless, meaning that the database itself does not care about the structure of the data that is stored in the database. It is possible to store documents with completely different fields in the same collection.
- Models are so-called constructor functions that create new JavaScript objects based on the provided parameters.

- I learnt how to remove the _id and _v field from the response of mongodb
- Generically, lint or a linter is any tool that detects and flags errors in programming languages, including stylistic errors. The term lint-like behavior is sometimes applied to the process of flagging suspicious language usage. Lint-like tools generally perform static analysis of source code.