
using System.Collections;
using System.Collections.Concurrent;

namespace FStudyForum.Core.Helpers
{
    public class ConnectionDictionary<TKey, TValue> : IEnumerable<KeyValuePair<TKey, TValue>> where TKey : notnull
    {
        private readonly ConcurrentDictionary<TKey, TValue> _dictionary = new();

        public TValue this[TKey key]
        {
            get => _dictionary[key];
            set => _dictionary[key] = value;
        }

        public bool AddOrUpdate(TKey key, TValue value, Func<TKey, TValue, TValue> updateValueFactory)
        {
            _dictionary.AddOrUpdate(key, value, updateValueFactory);
            return true;
        }

        public bool TryAdd(TKey key, TValue value)
        {
            return _dictionary.TryAdd(key, value);
        }

        public bool TryRemove(TKey key, out TValue? value)
        {
            return _dictionary.TryRemove(key, out value);
        }

        public bool TryGetValue(TKey key, out TValue? value)
        {
            return _dictionary.TryGetValue(key, out value);
        }

        public IEnumerator<KeyValuePair<TKey, TValue>> GetEnumerator()
        {
            return _dictionary.GetEnumerator();
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            return GetEnumerator();
        }
    }
}