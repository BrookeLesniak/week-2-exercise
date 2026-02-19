// ============================================
// My First MCP Server - Link Checker
// ============================================
// This server exposes a single tool called "check_link"
// that accepts a URL and checks whether it returns a valid response.

// --- Step 1: Import what we need ---
// McpServer: the main class that creates our server
// StdioServerTransport: lets the server communicate over stdin/stdout
//   (this is how Claude Code talks to MCP servers)
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// --- Step 2: Create the server ---
// Give it a name and version so Claude Code knows what it's talking to
const server = new McpServer({
  name: "link-checker",
  version: "1.0.0",
});

// --- Step 3: Define our "check_link" tool ---
// This tells Claude Code:
//   - the tool's name and description
//   - what inputs it expects (a URL string)
//   - what to do when the tool is called
server.tool(
  "check_link",
  "Checks if a URL returns a valid response. Accepts a URL and makes an HTTP request to verify it works.",
  {
    // The tool takes one input: a URL string
    url: z.string().url().describe("The URL to check"),
  },
  async ({ url }) => {
    try {
      // Make a simple HTTP request to the URL
      // We use HEAD first (faster, doesn't download the full page)
      // If HEAD fails, some servers don't support it, so we fall back to GET
      const response = await fetch(url, {
        method: "HEAD",
        // Time out after 10 seconds so we don't hang forever
        signal: AbortSignal.timeout(10000),
      });

      // Build a friendly result message
      const status = response.status;
      const ok = response.ok; // true if status is 200-299

      if (ok) {
        return {
          content: [
            {
              type: "text",
              text: `The link is valid! Status: ${status} (${response.statusText})`,
            },
          ],
        };
      } else {
        return {
          content: [
            {
              type: "text",
              text: `The link returned an error. Status: ${status} (${response.statusText})`,
            },
          ],
        };
      }
    } catch (error) {
      // Something went wrong (network error, timeout, invalid URL, etc.)
      return {
        content: [
          {
            type: "text",
            text: `Failed to reach the URL. Error: ${error.message}`,
          },
        ],
        isError: true,
      };
    }
  }
);

// --- Step 4: Start the server ---
// Connect using stdio transport (this is what Claude Code expects)
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  // The server is now running and waiting for requests from Claude Code!
  console.error("Link Checker MCP server is running...");
}

main();
