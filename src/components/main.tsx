"use client";

import Link from "next/link";
import Editor from '@monaco-editor/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const testText = `# Markdown syntax guide

## Headers

# This is a Heading h1
## This is a Heading h2
###### This is a Heading h6

## Emphasis

*This text will be italic*  
_This will also be italic_

**This text will be bold**  
__This will also be bold__

_You **can** combine them_

## Lists

### Unordered

* Item 1
* Item 2
* Item 2a
* Item 2b
    * Item 3a
    * Item 3b

### Ordered

1. Item 1
2. Item 2
3. Item 3
    1. Item 3a
    2. Item 3b

## Images

![This is an alt text.](/image.png "This is a sample image.")

## Links

You may be using [Markdown Live Preview](https://markdownlivepreview.com/).

## Blockquotes

> Markdown is a lightweight markup language with plain-text-formatting syntax, created in 2004 by John Gruber with Aaron Swartz.
>
>> Markdown is often used to format readme files, for writing messages in online discussion forums, and to create rich text using a plain text editor.

## Tables

| Left columns  | Right columns |
| ------------- |:-------------:|
| left foo      | right foo     |
| left bar      | right bar     |
| left baz      | right baz     |

## Blocks of code

\`\`\`
let message = 'Hello world';
alert(message);
\`\`\`
`

export default function Main() {

	const [theme, setTheme] = useState<"dark" | "light">("light");
	const [text, setText] = useState<string>(testText);

	useEffect(() => {
		const theme = localStorage.getItem("theme");
		setTheme(theme === "dark" ? "dark" : "light");
		document.documentElement.classList.toggle("dark", theme === "dark");
	}, [theme]);

	const toggleTheme = () => {
		setTheme(theme === "dark" ? "light" : "dark");
		localStorage.setItem("theme", theme === "dark" ? "light" : "dark");
		document.documentElement.classList.toggle("dark", theme === "dark");
	}
	
	const handleDelete = () => {
		setText("");
	}

	const handleCopy = () => {
		navigator.clipboard.writeText(text);
		toast.success("Copié avec succès !");
	}

	const handlePaste = () => {
		navigator.clipboard.readText()
			.then((text) => setText(text))
			.catch(() => toast.error("Impossible de coller le texte. Vérifiez que vous avez bien autorisé l'accès au presse-papiers."));
	}

	const handleDownload = () => {
		const blob = new Blob([text], { type: "text/markdown" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = "markdown.md";
		a.click();
		URL.revokeObjectURL(url);
		toast.success("Téléchargé avec succès !");
	}

	return (
		<div className="flex items-center justify-center h-screen p-4 dark:bg-dark">
			<div className="w-full h-full rounded-lg border-4 border-gray-200 dark:border-black overflow-hidden flex flex-col">
				<nav className="flex flex-row justify-between items-center p-4 bg-gray-200 dark:bg-black flex-shrink-0">
					<div className="grid grid-cols-3 w-full">
						<div className="col-span-1 flex flex-row items-center gap-4">
							<i className="fa-solid fa-trash fa-lg dark:text-white cursor-pointer" onClick={handleDelete}></i>
							<i className="fa-solid fa-copy fa-lg dark:text-white cursor-pointer" onClick={handleCopy}></i>
							<i className="fa-solid fa-clipboard fa-lg dark:text-white cursor-pointer" onClick={handlePaste}></i>
							<i className="fa-solid fa-download fa-lg dark:text-white cursor-pointer" onClick={handleDownload}></i>
						</div>

						<span className="col-span-1 text-center text-lg text-black dark:text-white font-bold">Markdown Live Editor</span>

						<div className="col-span-1 flex flex-row items-center gap-4 justify-end">
							<i className={`${theme === 'dark' ? 'fa-regular fa-sun-bright' : 'fa-regular fa-moon'} fa-lg dark:text-white cursor-pointer`} onClick={toggleTheme}></i>
							<Link href="https://github.com/ElSofian/markdown-editor" target="_blank">
								<i className="fa-brands fa-github fa-lg dark:text-white"></i>
							</Link>
						</div>
					</div>
				</nav>

				<div className="grid grid-cols-2 flex-1 divide-x-4 divide-gray-200 dark:divide-black overflow-hidden">
					<div className="col-span-1 h-full overflow-hidden">
						<Editor
							height="100%"
							theme={theme === 'dark' ? 'vs-dark' : 'light'}
							defaultLanguage="markdown"
							value={text}
							onChange={(v) => setText(v || '')}
							options={{ automaticLayout: true, minimap: { enabled: false } }}
						/>
					</div>
					<div className="col-span-1 bg-white dark:bg-neutral-800 h-full overflow-auto
					[&::-webkit-scrollbar]:w-2
					[&::-webkit-scrollbar-track]:bg-transparent
				[&::-webkit-scrollbar-thumb]:bg-gray-300
				dark:[&::-webkit-scrollbar-thumb]:bg-neutral-700"
					>
						<article className="prose prose-sm md:prose lg:prose-lg dark:prose-invert max-w-none p-6">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {text || ""}
              </ReactMarkdown>
            </article>
					</div>
				</div>
			</div>
		</div>
	)

}