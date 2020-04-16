using System;
using System.Linq;
using System.Linq.Expressions;

namespace CentralErrosApi.Helpers
{
    public static class IQueryableExtensions
    {
        public static IQueryable<T> OrderBy<T>(this IQueryable<T> source, string sortProperty, string sortOrder)
        {
            if (!String.IsNullOrEmpty(sortProperty) && (sortOrder.Equals("OrderBy") || sortOrder.Equals("OrderByDescending")))
            {

                var type = typeof(T);
                var property = type.GetProperty(sortProperty);
                var parameter = Expression.Parameter(type, "p");
                var propertyAccess = Expression.MakeMemberAccess(parameter, property);
                var orderByExp = Expression.Lambda(propertyAccess, parameter);
                MethodCallExpression resultExp = Expression.Call(typeof(Queryable), sortOrder, new Type[] { type, property.PropertyType }, source.Expression, Expression.Quote(orderByExp));
                return source.Provider.CreateQuery<T>(resultExp);
            }
            return source;
        }

        public static IQueryable<T> Page<T>(this IQueryable<T> source, int pageSkip, int pageSize)
        {
            source = source.Skip(pageSkip);

            if (pageSize > 0)
            {
                source = source.Take(pageSize);
            }

            return source;
        }

    }
}