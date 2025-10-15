{
  description = "Playwright development environment";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
    playwright.url = "github:pietdevries94/playwright-web-flake";
  };

  outputs =
    {
      self,
      flake-utils,
      nixpkgs,
      playwright,
    }:
    flake-utils.lib.eachDefaultSystem (
      system:
      let
        overlay = final: prev: {
          inherit (playwright.packages.${system}) playwright-test playwright-driver;
        };
        pkgs = import nixpkgs {
          inherit system;
          overlays = [ overlay ];
        };
      in
      {
        devShells.default = pkgs.mkShell {
          packages = with pkgs; [
            nodejs_22 # Latest LTS
            nodePackages.npm
            # nodePackages.pnpm  # uncomment if preferred
            playwright-test

            # Optional but useful additions:
            # nodePackages.typescript
            # nodePackages.eslint
            # nodePackages.prettier
          ];

          shellHook = ''
            export PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1
            export PLAYWRIGHT_BROWSERS_PATH="${pkgs.playwright-driver.browsers}"

            # Helpful info on shell entry
            echo "🎭 Playwright environment ready"
            echo "Node: $(node --version)"
            echo "NPM: $(npm --version)"
            echo "Playwright browsers: $PLAYWRIGHT_BROWSERS_PATH"

            # Auto-install npm deps if package.json exists and node_modules is missing
            if [[ -f package.json && ! -d node_modules ]]; then
              echo "📦 Installing npm dependencies..."
              npm install
            fi
          '';
        };

        # Optional: Add formatter for `nix fmt`
        formatter = pkgs.nixfmt-rfc-style;
      }
    );
}
