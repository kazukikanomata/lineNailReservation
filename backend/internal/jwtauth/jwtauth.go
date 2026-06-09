package jwtauth

import (
	"errors"
	"strconv"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

const (
	ContextAdminSubjectKey = "jwt_sub"
	ContextAdminEmailKey   = "jwt_email"
)

var ErrInvalidToken = errors.New("invalid token")

func MintAccessToken(secret []byte, issuer, audience string, ttl time.Duration, adminID uint, email string) (string, error) {
	now := time.Now()
	exp := now.Add(ttl)

	t := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub":   strconv.FormatUint(uint64(adminID), 10),
		"email": email,
		"iss":   issuer,
		"aud":   audience,
		"iat":   now.Unix(),
		"nbf":   now.Unix(),
		"exp":   exp.Unix(),
	})
	return t.SignedString(secret)
}

func ParseAndValidate(secret []byte, issuer, audience, raw string) (jwt.MapClaims, error) {
	parser := jwt.NewParser(
		jwt.WithValidMethods([]string{jwt.SigningMethodHS256.Alg()}),
		jwt.WithIssuer(issuer),
		jwt.WithAudience(audience),
		jwt.WithLeeway(30*time.Second),
	)
	token, err := parser.Parse(raw, func(t *jwt.Token) (any, error) {
		return secret, nil
	})
	if err != nil || !token.Valid {
		return nil, ErrInvalidToken
	}
	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok {
		return nil, ErrInvalidToken
	}
	if _, ok := claims["exp"]; !ok {
		return nil, ErrInvalidToken
	}
	return claims, nil
}

func BearerMiddleware(secret []byte, issuer, audience string) gin.HandlerFunc {
	return func(c *gin.Context) {
		h := c.GetHeader("Authorization")
		tokenStr := ""
		if strings.HasPrefix(h, "Bearer ") {
			tokenStr = strings.TrimSpace(strings.TrimPrefix(h, "Bearer "))
		}
		if tokenStr == "" {
			c.JSON(401, gin.H{"error": "missing_bearer"})
			c.Abort()
			return
		}
		claims, err := ParseAndValidate(secret, issuer, audience, tokenStr)
		if err != nil {
			c.JSON(401, gin.H{"error": "invalid_token"})
			c.Abort()
			return
		}
		sub, _ := claims["sub"].(string)
		email, _ := claims["email"].(string)
		if sub == "" {
			c.JSON(401, gin.H{"error": "invalid_token"})
			c.Abort()
			return
		}
		c.Set(ContextAdminSubjectKey, sub)
		c.Set(ContextAdminEmailKey, email)
		c.Next()
	}
}
