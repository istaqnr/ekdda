/**
 * Auth Bridge Utilities
 *
 * These utilities enable authentication state sharing between apps on different ports
 * by passing encrypted tokens through URL parameters.
 */

/**
 * Safely encode a string to base64, handling Unicode characters
 */
function encodeBase64(str: string): string {
   const bytes = new TextEncoder().encode(str);
   const binString = Array.from(bytes, (byte) => String.fromCodePoint(byte)).join("");

   return btoa(binString);
}

/**
 * Safely decode a base64 string, handling Unicode characters
 */
function decodeBase64(str: string): string {
   const binString = atob(str);
   const bytes = Uint8Array.from(binString, (char) => char.codePointAt(0)!);
   return new TextDecoder().decode(bytes);
}

/**
 * Generates a temporary bridge token from auth state
 * In production, this should use proper JWT signing
 */
export function createBridgeToken(authData: any): string {
   // console.log("🌊 : createBridgeToken : authData:", authData);
   const data = {
      ...authData,
      timestamp: Date.now(),
      expires: Date.now() + 5 * 60 * 1000, // 5 minutes
   };
   return encodeBase64(JSON.stringify(data));
}

/**
 * Validates and decodes a bridge token
 */
export function validateBridgeToken(token: string): any | null {
   try {
      const data = JSON.parse(decodeBase64(token));

      // Check if token is expired
      if (data.expires < Date.now()) {
         console.warn("Bridge token expired");
         return null;
      }

      return data;
   } catch (error) {
      console.error("Invalid bridge token:", error);
      return null;
   }
}

/**
 * Creates a URL with auth bridge token
 */
export function createAuthBridgeUrl(targetUrl: string, authData: any): string {
   const token = createBridgeToken(authData);
   const url = new URL(targetUrl);
   url.searchParams.set("authBridge", token);
   return url.toString();
}
