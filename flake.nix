{
  description = "Campus-front development environment with Node.js 16";

  inputs = {
    # Pin to nixpkgs 23.05 which still has Node.js 16
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-23.05";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        # Allow insecure Node.js 16 (it's EOL but needed for old dependencies)
        pkgs = import nixpkgs {
          inherit system;
          config.permittedInsecurePackages = [
            "nodejs-16.20.2"
          ];
        };
      in
      {
        devShells.default = pkgs.mkShell {
          buildInputs = with pkgs; [
            nodejs_16
          ];
          
          shellHook = ''
            echo "======================================"
            echo "Campus-front Development Environment"
            echo "======================================"
            echo ""
            echo "Node.js version: $(node --version)"
            echo "npm version: $(npm --version)"
            echo ""
            echo "Backend API proxy: http://localhost:5001"
            echo "Frontend will run on: http://localhost:3000"
            echo ""
            echo "To get started:"
            echo "  1. npm install    (if not already done)"
            echo "  2. npm start      (starts React dev server)"
            echo ""
            echo "Note: This uses Node.js 16 for compatibility"
            echo "      with react-scripts 4.0.3"
            echo "======================================"
          '';
        };
      }
    );
}
